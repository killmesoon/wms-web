<template>
    <div ref="mainContent" class="white-body-view">
        <div>
            <el-table
                    ref="table"
                    v-loading="loading"
                    border
                    :max-height="tableHeight"
                    :data="tableData"
                    stripe
                    highlight-current-row
                    style="width: 100%"
            >
                <el-table-column prop="dicTypeCode" label="字典编码">
                </el-table-column>
                <el-table-column prop="dicTypeName" label="字典名称">
                </el-table-column>
<!--                <el-table-column prop="dicType" label="字典类型">-->
<!--                </el-table-column>-->
                <el-table-column prop="primaryFlag" align="center" label="是否系统录入">
                    <template slot-scope="scope">
                        <span>{{scope.row.primaryFlag ? 'Y': 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="enableFlag" align="center" label="是否有效">
                    <template slot-scope="scope">
                        <span>{{scope.row.enableFlag ? 'Y': 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit"
                                   @click="editSupplier(scope.row)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete"
                                   @click="deleteSupplier(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { queryWmsDicListExtList } from '../../../../api/dic/dic'

  export default {
    name: 'index',
    data() {
      return {
        tableHeight: 500,
        tableData: [],
        loading: false
      }
    },
    created() {
      queryWmsDicListExtList().then(res => {
        this.tableData = res.data
      })
    }
  }
</script>

<style scoped>
    .main-content {
        background: white;
        height: calc(100vh - 84px);
        padding: 10px;
    }

</style>
