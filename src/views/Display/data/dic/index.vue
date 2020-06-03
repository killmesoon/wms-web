<template>
    <div class="white-body-view">

        <!-- 组织架构 -->
        <el-card class="box-card left-view" shadow="never">
            <div slot="header" class="clearfix">
                <span>字典设置</span>
            </div>
            <div v-loading="treeLoading" class="container-item">
                <el-tree :data="treeData" :props="treeProps" accordion>

                </el-tree>
            </div>
        </el-card>
        <el-card class="box-card right-container" shadow="never">
            <div slot="header" class="clearfix name-title">
                <div class="operation-view">

                </div>
            </div>
            <div class="container-item">

            </div>
        </el-card>
    </div>
</template>

<script>
  import { queryWmsDicListExtList } from '../../../../api/dic/dic'

  export default {
    created() {
      queryWmsDicListExtList().then(res => {
        this.treeData = res.data
      })
    },
    data() {
      return {
        treeData: [],
        treeFilterText: '',
        treeLoading: false,
        activeName: 'first',
        selectOrganization: {},
        titleText: '账户及组',
        contentText: '管理员可以在当前页面对组织机构（组织和部门）、用户组、账户进行管理，也可以使用AD/LDAP、或者Excel文件的方式配置导入或同步数据。可以在左侧的组织架构树中选择某个组织或者部门，并在右侧为其子组织机构、组、账户进行增、删、改、查等操作。',
        treeListQuery: {
          includeAccountGroup: 0
        },
        tipViewHeight: 102,
        treeProps:{
          label: 'treeName',
          children: 'children'
        }
      }
    },
    methods: {},
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
    }
</style>
<style lang="scss">
    .right-container {
        .el-card__header {
            padding: 7px 20px;
        }
    }
</style>
