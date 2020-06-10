<template>
    <div style="position: relative;">
        <div class="line-wrapper">
            <!--            <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item"-->
            <!--                              @getSelectedDate="getSelectedDate"/>-->

            <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
            <el-button type="danger" size="mini" icon="el-icon-delete"> 批量删除</el-button>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="lineAdd"> 录入</el-button>
        </div>
        <div>
            <el-table
                    ref="table"
                    v-loading="loading"
                    border
                    :max-height="tableHeight"
                    :data="tableData"
                    stripe
                    style="width: 100%"
            >
                <el-table-column
                        type="selection"
                        width="30">
                </el-table-column>
                <el-table-column prop="lineNum" label="行号">
                </el-table-column>
                <el-table-column prop="itemCode" label="物料编码">
                </el-table-column>
                <el-table-column prop="description" label="物料描述">
                </el-table-column>
                <el-table-column prop="warehouseCode" label="仓库编码">
                </el-table-column>
                <el-table-column prop="warehouseName" label="仓库名称">
                </el-table-column>
                <el-table-column prop="uom" label="单位">
                </el-table-column>
                <el-table-column prop="planQty" label="计划数量">
                </el-table-column>
                <el-table-column prop="realSourceDocType" label="来源单据类型">
                </el-table-column>
                <el-table-column prop="sourceDocNum" label="单据号">
                </el-table-column>
                <el-table-column prop="sourceLineNum" label="单据行号">
                </el-table-column>
                <el-table-column prop="note" label="备注">
                </el-table-column>
                <el-table-column
                        width="90"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="mini" icon="el-icon-delete" @click="deleteLine(scope.row)">
                        </el-button>
                    </template>
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
  import Pagination from '@/components/Pagination'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { getItemList } from '../../../api/data/data'
  import { getWareHouseList } from '../../../api/model/warehouse'
  import { getUomList } from '../../../api/data/uom'
  import { queryWmsErpAsnLineListByHeadId } from '../../../api/asn'
  export default {
    name: 'AsnLineTable',
    created() {
      this.initData()
    },
    components: {
      Pagination
    },
    data() {
      return {
        loading: false,
        tableData: [],
        tableHeight: 100,
        disable: true,
        gridData: [],
        listQuery: {
          page: 1,
          limit: 20,
          offset: 0,
          selectOperationType: '',
          selectApplication: '',
          startTime: '',
          endTime: ''
        },
        total: 0,
      }
    },
    methods: {
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          queryWmsErpAsnLineListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.asnHeadFlag).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              this.total =res.data.total
              that.loading = false
            }
          })
          that.loading = false
        }, 500)
      },
      lineAdd() {

      }
    },
    computed: {
      ...mapGetters([
        'asnHeadFlag'
      ])
    },
    watch: {
      asnHeadFlag: {
        handler(n , o) {
          this.loading = true
          this.initData()
        }
      }
    }
  }
</script>

<style scoped>
    .line-wrapper > .el-button {
        float: right;
        margin-right: 3px;
    }
</style>
