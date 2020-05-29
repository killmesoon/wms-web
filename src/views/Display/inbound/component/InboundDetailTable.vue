<template>
    <div style="position: relative;">
        <div>
            <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item" @getSelectedDate="getSelectedDate" />

            <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
            <el-button type="primary" icon="el-icon-plus"> 录入</el-button>
            <el-button type="danger" icon="el-icon-delete"> 批量删除</el-button>
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
                <el-table-column prop="advLotCode" label="行号">
                </el-table-column>
                <el-table-column prop="itemCode" label="物料编码">
                </el-table-column>
                <el-table-column prop="itemDesc" label="物料描述">
                </el-table-column>
                <el-table-column prop="advWarehouseName" label="建议仓库">
                </el-table-column>
                <el-table-column prop="advLocatorName" label="建议货位">
                </el-table-column>
                <el-table-column prop="advLotCode" label="建议批次">
                </el-table-column>
                <el-table-column prop="advQuantity" label="建议数量">
                </el-table-column>
                <el-table-column prop="advBarcode" label="建议条码">
                </el-table-column>
                <el-table-column prop="excuWarehouseName" label="执行仓库">
                </el-table-column>
                <el-table-column prop="excuLocatorName" label="执行货位">
                </el-table-column>
                <el-table-column prop="excuLotCode" label="执行批次">
                </el-table-column>
                <el-table-column prop="excuQuantity" label="执行数量">
                </el-table-column>
                <el-table-column prop="execBarcode" label="执行条码">
                </el-table-column>
                <el-table-column prop="note" label="备注">
                </el-table-column>
<!--                <el-table-column-->
<!--                        width="90"-->
<!--                        label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button  type="danger" size="mini" icon="el-icon-delete">-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
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
  import DatePeriodSelect from '@/components/Search/DatePeriodSelect'
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import Pagination from '@/components/Pagination'
  import {mapGetters} from 'vuex'
  import { findInboundDetailListByHeadId } from '../../../../api/inbound'
  export default {
    name: 'DetailTable',
    components: {
      DatePeriodSelect,
      Pagination,
      KeyWordSearch
    },
    data() {
      return {
        loading: false,
        tableData: [],
        tableHeight: 100,
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
    created() {
      this.initTime()
    },

    mounted() {
      const that = this
      this.initTaleHeight()
      window.addEventListener('resize', function() {
        that.initTaleHeight()
      })
    },
    methods: {
      initTime() {
        this.listQuery.startTime = this.$moment().subtract('days', 30).format('YYYY-MM-DD')
        this.listQuery.endTime = this.$moment().format('YYYY-MM-DD')
        this.selectedDate = [this.listQuery.startTime, this.listQuery.endTime]
        this.initData()
      },

      initTaleHeight() {
        const topViewHeight = document.getElementById('bottomView').offsetHeight
        if (topViewHeight) {
          this.$nextTick(() => {
            // 50 表格上方按钮区域高度  120 分页组件区域高度  50 tabs组件高度
            this.tableHeight = topViewHeight - this.$refs.table.$el.offsetTop - 120 - 50
          })
        }
      },

      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          findInboundDetailListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          },this.headIdFlag).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              that.loading  = false
            }
          })
          that.loading = false
        }, 500)
      },

      /**
       * @description: 根据搜索框输入文字检索
       * @param message 搜索框输入的文字
       */
      getSearchData(message) {
        this.listQuery.keywords = message
        this.listQuery.page = 1
        this.initData()
      },

      /**
       * @description: 获取时间区间
       * @param date 时间范围
       */
      getSelectedDate(date) {
        this.listQuery.startTime = date[0]
        this.listQuery.endTime = date[1]
        this.initData()
      }

    },
    computed: {
      ...mapGetters([
        'headIdFlag'
      ])
    },
    watch: {
      headIdFlag: {
        handler(newVal ,oldValue) {
          this.loading = true
          findInboundDetailListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          },this.headIdFlag).then(res => {
            if (res.code == 200) {
              this.tableData = res.data.records
              this.loading = false
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
