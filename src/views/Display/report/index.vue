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
                <el-table-column prop="itemId" label="物料">

                </el-table-column>
                <el-table-column prop="warehouseId" label="仓库">

                </el-table-column>
                <el-table-column prop="locatorId" label="货位">

                </el-table-column>
                <el-table-column prop="loctOnhand" label="现有量">

                </el-table-column>
                <el-table-column prop="lotNumber" label="批次">

                </el-table-column>
                <el-table-column prop="uomCode" label="单位">

                </el-table-column>
                <el-table-column prop="mergeFlag" label="合并标识">

                </el-table-column>
                <el-table-column prop="ownerType" label="所有者类型">

                </el-table-column>
                <el-table-column prop="ownerSiteId" label="所有者地址ID">

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
  import {queryQuantityList} from '../../../api/asn'

  export default {
    name: 'index',
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
        queryQuantityList({
          current: this.listQuery.page,
          size: this.listQuery.limit
        },{}).then(res => {
          if (res.code == 200) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
