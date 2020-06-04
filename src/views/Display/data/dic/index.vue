<template>
    <div class="white-body-view">

        <!-- 组织架构 -->
        <el-card class="box-card left-view" shadow="never">
            <div slot="header" class="clearfix">
                <span>字典设置</span>
            </div>
            <div v-loading="treeLoading" class="container-item">
                <el-tree :data="treeData" :props="treeProps"
                         accordion @node-click="clickDic">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button type="text" size="mini" v-if="!node.isLeaf" @click="editTreeNode(node, data)"
                                       icon="el-icon-edit"></el-button>
                        <el-button type="text" size="mini" v-if="!node.isLeaf" @click="addTreeNode(node, data)"
                                   icon="el-icon-plus"></el-button>
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-card>
        <el-card class="box-card right-container" shadow="never">
            <div slot="header" class="clearfix name-title">
            </div>
            <div class="container-item">
                <div class="operation-view">
                    <el-table
                            ref="table"
                            v-loading="treeLoading"
                            border
                            :max-height="tableHeight"
                            :data="tableData"
                            stripe
                            highlight-current-row
                            style="width: 100%"
                    >
                        <el-table-column prop="dicTypeCode" label="字典类型编码">
                        </el-table-column>
                        <el-table-column prop="dicTypeName" label="字典类型名称">
                        </el-table-column>
                        <el-table-column prop="dicCode" label="字典编码">
                        </el-table-column>
                        <el-table-column prop="dicName" label="字典名称">
                        </el-table-column>
                        <el-table-column prop="enableFlag" align="center" label="是否有效">
                            <template slot-scope="scope">
                                <el-switch @change="enableChange(scope.row)" v-model="scope.row.enableFlag"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="isSystem" align="center" label="是否系统录入">
                            <template slot-scope="scope">
                                <span>{{scope.row.isSystem ? 'Y': 'N'}}</span>
                                <!--                                <el-switch v-model="scope.row.isSystem" @change="isSystemChange(scope.row)"></el-switch>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" icon="el-icon-edit"
                                           @click="editSupplier(scope.row)"
                                           :disabled="scope.row.enableFlag"></el-button>
                                <el-button type="danger" size="mini" :disabled="scope.row.isSystem"
                                           icon="el-icon-delete"
                                           @click="deleteSupplier(scope.row)"
                                ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>

        <el-dialog :visible.sync="dialogVisible"
                   :close-on-click-modal="closeFlag"
                   :title="dialogTitle">
            <el-form :model="form" size="small" label-position="right" ref="uomForm" :inline="isFormInline">
                <el-form-item label="字典类型编码" :label-width="formLabelWidth">
                    <el-input v-model="form.dicTypeCode" :disabled="!editFlag" placeholder="请定义字典类型编码" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="字典类型名称" :label-width="formLabelWidth">
                    <el-input v-model="form.dicTypeName" :disabled="!editFlag" placeholder="请输入字典类型名称" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="!editFlag" label="字典编码" :label-width="formLabelWidth">
                    <el-input v-model="form.dicCode" placeholder="请定义字典编码" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="!editFlag"  label="字典名称" :label-width="formLabelWidth">
                    <el-input v-model="form.dicName" placeholder="请输入字典名称" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="!editFlag" label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag"  placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item v-if="!editFlag"  label="是否系统录入" :label-width="formLabelWidth">
                    <el-select v-model="form.isSystem" :disabled="disable" placeholder="是否系统录入">
                        <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                                   :value="item.dicCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import { queryWmsDicListExtList, saveOrUpdateWmsDic } from '../../../../api/dic/dic'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'

  export default {
    created() {
      queryWmsDicListExtList().then(res => {
        if (res.code == 200) {
          this.treeData = res.data
          this.tableData = res.data[0].children
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
    },
    data() {
      return {
        treeData: [],
        treeFilterText: '',
        treeLoading: false,
        activeName: 'first',
        selectOrganization: {},
        form: {},
        titleText: '账户及组',
        contentText: '管理员可以在当前页面对组织机构（组织和部门）、用户组、账户进行管理，也可以使用AD/LDAP、或者Excel文件的方式配置导入或同步数据。可以在左侧的组织架构树中选择某个组织或者部门，并在右侧为其子组织机构、组、账户进行增、删、改、查等操作。',
        treeListQuery: {
          includeAccountGroup: 0
        },
        tipViewHeight: 102,
        treeProps: {
          label: 'treeName',
          children: 'children'
        },
        tableData: [],
        tableHeight: '500px',
        dialogVisible: false,
        dialogTitle: '待定',
        closeFlag: true,
        isFormInline: true,
        disable: true,
        formLabelWidth: '100px',
        editFlag: false
      }
    },
    methods: {
      clickDic(data, node, e) {
        // console.log(node)
        if (data.children) {
          this.tableData = data.children
        }
      },
      addTreeNode(node, data) {
        this.dialogVisible = true
        this.dialogTitle = '新增字典'
        this.form = data
        this.$set(this.form, 'isSystem', '0')
        console.log(this.form)
      },
      editTreeNode(node, data) {
        this.dialogVisible = true
        this.editFlag = true
        this.dialogTitle = '编辑字典'
        this.form = data
      },
      enableChange(data) {
        saveOrUpdateWmsDic(data).then(res => {
          if (res.code == 200) {
            this.$store.dispatch('dic/initDic')
          } else {
            Message.error(res.msg)
          }
        }).catch(e => {
          Message.error(e)
        })
      },
      editSupplier(data) {
        this.dialogVisible = true
        this.editFlag = false
        this.dialogTitle = '编辑字典'
        this.form = JSON.parse(JSON.stringify(data))
        this.form.enableFlag = this.form.enableFlag ? '1' : '0'
        this.form.isSystem = this.form.isSystem ? '1' : '0'
      },
      confirmSubmit() {

      },
      cancelAdd() {
        this.dialogVisible = false
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList'
      ])
    }
  }
</script>
<style lang="scss" scoped>
    .container-item {
        height: calc(100vh - 220px);
        overflow: hidden;
    }

    .tree-view {
        height: calc(100vh - 260px);
        overflow: auto;
    }

    .left-view {
        width: 410px;
        float: left;
        margin-right: 10px;
    }

    .item-icon {
        cursor: pointer;
        padding: 0 6px;
    }

    .name-title {
        line-height: 40px;
    }

    .operation-btn {
        margin: 0 4px;
        cursor: pointer;
        vertical-align: text-top;
    }

    .operation-view {
        display: inline-block;
        color: #777777;
        width: 100%;
    }
</style>
<style lang="scss">
    .right-container {
        .el-card__header {
            padding: 7px 20px;
        }
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
