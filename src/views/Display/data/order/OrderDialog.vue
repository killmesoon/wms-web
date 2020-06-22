<template>
    <div>
        <el-form :model="form" size="small" label-position="right" ref="dialogForm"
                 :validate-on-rule-change="false"
                 :rules="rules" :inline="isFormInline">
            <el-form-item v-if="flag" label="快码" :label-width="formLabelWidth">
                <el-input v-model="form.lookupcode" placeholder="请输入快码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="快码" prop="lookupcode" :label-width="formLabelWidth">
                <el-input v-model="form.lookupcode" @focus="chooseDic" ref="codeInput" placeholder="请输入快码"
                          autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="单据类型" :label-width="formLabelWidth">
                <el-input v-model="form.docType" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="单据类型" :label-width="formLabelWidth">
                <el-input v-model="form.docType" disabled autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="单据名称" :label-width="formLabelWidth">
                <el-input v-model="form.docName" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="单据名称" :label-width="formLabelWidth">
                <el-input v-model="form.docName" :disabled="disable" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="前缀" :label-width="formLabelWidth">
                <el-input v-model="form.prefix" placeholder="请输入前缀" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else prop="prefix" label="前缀" :label-width="formLabelWidth">
                <el-input v-model="form.prefix" placeholder="请输入前缀" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" prop="sequenceNum" label="位数" :label-width="formLabelWidth">
                <el-input v-model.number="form.sequenceNum" placeholder="请输入6到8位" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="描述" :label-width="formLabelWidth">
                <el-input v-model="form.note" placeholder="请输入描述" autocomplete="off">
                </el-input>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible" :append-to-body="applyToBody" :close-on-click-modal="closeFlag" title="选择快码" width="50%"
                   @open="loadData">
            <KeyWordSearch input-width="360px" place-holder="支持快码、单据类型、单据名称快速搜索" @search="getSearchData"/>
            <el-table
                    ref="table"
                    v-loading="loading"
                    border
                    :max-height="tableHeight"
                    :data="docTableData"
                    stripe
                    highlight-current-row
                    style="width: 100%"
            >
                <el-table-column prop="dicTypeCode" label="快码">

                </el-table-column>
                <el-table-column prop="dicTypeName" label="单据类型">

                </el-table-column>
                <el-table-column prop="dicName" label="单据名称">

                </el-table-column>
                <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-plus"
                                   @click="chooseLookupCode(scope.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!--            <div class="tree-wrapper">-->
            <!--                <el-card class="box-card left-view" shadow="never">-->
            <!--                    <div slot="header" class="clearfix">-->
            <!--                        <span>快码选择</span>-->
            <!--                    </div>-->
            <!--                    <div v-loading="treeLoading" class="container-item">-->
            <!--                        <el-tree :data="treeData" :props="treeProps"-->
            <!--                                 accordion @node-click="clickDic">-->
            <!--                        </el-tree>-->
            <!--                    </div>-->
            <!--                </el-card>-->
            <!--                <el-card class="box-card right-container" shadow="never">-->
            <!--                    <div slot="header" class="clearfix name-title">-->
            <!--                    </div>-->
            <!--                    <div class="container-item">-->
            <!--                        <div class="operation-view">-->
            <!--                            <el-table-->
            <!--                                    ref="table"-->
            <!--                                    v-loading="treeLoading"-->
            <!--                                    border-->
            <!--                                    :max-height="tableHeight"-->
            <!--                                    :data="tableData"-->
            <!--                                    stripe-->
            <!--                                    highlight-current-row-->
            <!--                                    style="width: 100%"-->
            <!--                            >-->
            <!--                                <el-table-column prop="dicTypeCode" label="字典类型编码">-->
            <!--                                </el-table-column>-->
            <!--                                <el-table-column prop="dicTypeName" label="字典类型名称">-->
            <!--                                </el-table-column>-->
            <!--                                <el-table-column prop="dicCode" label="字典编码">-->
            <!--                                </el-table-column>-->
            <!--                                <el-table-column prop="dicName" label="字典名称">-->
            <!--                                </el-table-column>-->
            <!--                                <el-table-column prop="enableFlag" align="center" label="是否有效">-->
            <!--                                    <template slot-scope="scope">-->
            <!--                                        <span>{{scope.row.enableFlag ? 'Y': 'N'}}</span>-->
            <!--                                    </template>-->
            <!--                                </el-table-column>-->
            <!--                                <el-table-column prop="isSystem" align="center" label="是否系统录入">-->
            <!--                                    <template slot-scope="scope">-->
            <!--                                        <span>{{scope.row.isSystem ? 'Y': 'N'}}</span>-->
            <!--                                    </template>-->
            <!--                                </el-table-column>-->
            <!--                                <el-table-column-->
            <!--                                        width="90"-->
            <!--                                        fixed="right"-->
            <!--                                        label="操作">-->
            <!--                                    <template slot-scope="scope">-->
            <!--                                        <el-button type="primary" size="mini"-->
            <!--                                                   :disabled="scope.row.docFlag"-->
            <!--                                                   icon="el-icon-plus"-->
            <!--                                                   @click="chooseCode(scope.row)"-->
            <!--                                        ></el-button>-->
            <!--                                    </template>-->
            <!--                                </el-table-column>-->
            <!--                            </el-table>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </el-card>-->
            <!--            </div>-->
        </el-dialog>
    </div>
</template>

<script>
  import { queryWmsDicListExtList } from '../../../../api/dic/dic'
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import { Message } from 'element-ui'

  export default {
    name: 'OrderDialog',
    props: {
      data: Object,
      flag: Boolean
    },
    components: {
      KeyWordSearch
    },
    data() {
      var checkSequenceNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('位数不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value > 8) {
              callback(new Error('位数不得超过8'))
            } else if (value < 6) {
              callback(new Error('位数不能低于4位'))
            } else {
              callback()
            }
          }
        }, 300)
      }
      var checkLookCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error('快码不能为空'))
        } else {
          callback()
        }
      }
      return {
        form: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        formLabelWidth: '100px',
        closeFlag: false,
        disable: true,
        dialogVisible: false,
        applyToBody: true,
        tableHeight: '500px',
        tableData: [],
        treeData: [],
        treeProps: {
          label: 'treeName',
          children: 'children'
        },
        tipViewHeight: 102,
        treeLoading: true,
        docTableData: [],
        loading: false,
        rules: {
          sequenceNum: [
            { required: true, validator: checkSequenceNum, trigger: 'blur' }
          ],
          lookupcode: [
            { required: true, validator: checkLookCode, trigger: 'blur' }
          ],
          prefix: [{ required: true, message: '请输入前缀', trigger: 'blur' }]
        }
      }
    },
    methods: {
      chooseDic() {
        //呼出快码选择框
        this.dialogVisible = true
      },
      /**
       * @description: 根据搜索框输入文字检索
       * @param message 搜索框输入的文字
       */
      getSearchData(message) {
        console.log(message)
        // this.listQuery.keywords = message
        // this.listQuery.page = 1
        // this.initData()
      },
      // loadTree() {
      //   //加载快码树信息
      //   const that = this
      //   this.treeLoading = true
      //   setTimeout(() => {
      //     queryWmsDicListExtList().then(res => {
      //       if (res.code == 200) {
      //         that.treeData = res.data
      //         that.tableData = res.data[0].children
      //         that.treeLoading = false
      //       } else {
      //         Message.error(res.msg)
      //       }
      //     }).catch(e => {
      //       Message.error(e)
      //     })
      //   },500)
      // },
      loadData() {
        let that = this
        this.loading = true
        setTimeout(() => {
          queryWmsDicListExtList().then(res => {
            if (res.code == 200) {
              let orderList = []
              let tmpList = res.data
              for (let t of tmpList) {
                switch (t.dicTypeId) {
                  case 20:
                    orderList.push(t)
                    break
                  case 21:
                    orderList.push(t)
                    break
                  case 24:
                    orderList.push(t)
                    break
                }
              }
              that.docTableData = orderList
              this.loading = false
            } else {
              Message.error(res.msg)
            }
          }).catch(e => {
            Message.error(e)
          })
        }, 500)
      },
      clickDic(data, node, e) {
        if (data.children) {
          this.tableData = data.children
        }
      },
      chooseCode(data) {
        //选择快码
        this.$nextTick(() => {
          this.$set(this.form, 'lookupcode', data.dicTypeCode)
          // this.form.lookupcode = data.dicTypeCode
          this.form.docType = data.dicCode
          this.form.docName = data.dicName
          this.form.dicId = data.dicId
          this.$refs.dialogForm.validateField('lookupcode')
        })

        // this.form.dicId = data.dicId

        this.dialogVisible = false
      }
    },
    watch: {
      data(current, old) {
        this.form = JSON.parse(JSON.stringify(current))
      },
      flag(current, old) {
        this.flag = current
      }
    }
  }
</script>

<style scoped>
    .tree-wrapper {
        height: 700px;
        overflow: auto;
    }

    .container-item {
        height: 500px;
        overflow: auto;
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
