<template>
    <div class="white-body-view">
        <KeyWordSearch input-width="360px" place-holder="支持工厂，仓库，货位区域等搜索" @search="getSearchData" />
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
                <el-table-column prop="plantId" label="工厂">

                </el-table-column>
                <el-table-column prop="dsequenceNum" label="钢板号">
                </el-table-column>
                <el-table-column prop="itemCode" label="物料编码">
                </el-table-column>
                <el-table-column prop="description" label="物料描述">
                </el-table-column>
                <el-table-column prop="warehouseCode" label="仓库编码">
                </el-table-column>
                <el-table-column prop="warehouseName" label="仓库简称">
                </el-table-column>
                <el-table-column width="120px" prop="weight" label="重量">
                </el-table-column>
                <el-table-column prop="weightUom" label="重量单位">
                </el-table-column>
                <el-table-column prop="size" label="规格">
                </el-table-column>
                <el-table-column prop="thickness" label="厚度">
                </el-table-column>
                <el-table-column prop="sizeUom" label="尺寸单位">
                </el-table-column>
                <el-table-column prop="heatNumber" label="炉号">
                </el-table-column>
                <el-table-column prop="enableFlag" label="是否有效">
                    <template slot-scope="scope">
                        <span>{{scope.row.enableFlag ? 'Y' : 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注">
                </el-table-column>
            </el-table>
            <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="initData"
            />
        </div>
    </div>
</template>

<script>
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import Pagination from '@/components/Pagination'
  import {queryWmsSglItemList} from '../../../api/report'

  export default {
    name: 'BarcodeReport',
    created() {
      this.initData()
    },
    data() {
      return {
        tableData: [],
        tableHeight: '500px',
        loading: false,
        listQuery: {
          page: 1,
          limit: 20,
          offset: 0,
          selectOperationType: '',
          selectApplication: '',
          startTime: '',
          endTime: ''
        },
        total: 4
      }
    },
    components: {
      KeyWordSearch,
      Pagination
    },
    methods: {
      /**
       * @description: 根据搜索框输入文字检索
       * @param message 搜索框输入的文字
       */
      getSearchData(message) {
        this.listQuery.keywords = message
        this.listQuery.page = 1
      },

      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          queryWmsSglItemList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          },{}).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              that.loading = false
            }
          })
        },500)
      }
    }
  }
</script>

<style scoped>

</style>
