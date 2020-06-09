<template>
    <div>
        <div style="position: relative;">
            <div class="head-wrapper">
                <!--            <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item"-->
                <!--                              @getSelectedDate="getSelectedDate"/>-->
                <!--            <el-select v-model="listQuery.selectApplication" placeholder="请选择工厂">-->
                <!--                <el-option-->
                <!--                        v-for="item in plantList"-->
                <!--                        :key="item.plantId"-->
                <!--                        :label="item.plantName"-->
                <!--                        :value="item.plantId"-->
                <!--                />-->
                <!--            </el-select>-->
                <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteOrderList"> 批量删除</el-button>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="inboundAdd"> 录入</el-button>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="searchInbound"> 查询</el-button>
            </div>
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
                        @current-change="handleCurrentChange"
                >
                    <el-table-column prop="asnNumber" label="单据号">
                    </el-table-column>
                    <el-table-column prop="asnTypeDic" label="单据类型">
                    </el-table-column>
                    <el-table-column prop="asnStatusDic" label="单据状态">
                    </el-table-column>
                    <el-table-column prop="plantId" label="所在工厂">
                    </el-table-column>
                    <el-table-column prop="sourceDocTypeDic" label="来源单据类型">
                    </el-table-column>
                    <el-table-column prop="sourceDocNum" label="来源单据号">
                    </el-table-column>
                    <el-table-column prop="planDeliverDate" label="计划到货日期">
                    </el-table-column>
                    <el-table-column label="是否紧急">
                        <template slot-scope="scope">
                            <span>{{scope.row.isEmergency ? 'Y' : 'N'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="supplierName" label="供应商">
                    </el-table-column>
                    <el-table-column prop="dcompanyName" label="送货单位">
                    </el-table-column>
                    <el-table-column prop="duserName" label="送货人">
                    </el-table-column>
                    <el-table-column prop="dphone" label="联系电话">
                    </el-table-column>
                    <el-table-column prop="dshipNum" label="车船号">
                    </el-table-column>
                    <el-table-column prop="note" label="备注">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="180"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteHeadOrder(scope.row)">
                            </el-button>
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editHeadOrder(scope.row)">
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
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { queryWmsErpAsnHeadList } from '../../../api/asn'
  import {mapGetters} from 'vuex'

  export default {
    name: 'AsnHeadTable',
    created() {
      this.initData()
    },
    components: {
      Pagination
    },
    mounted() {
      const that = this
      this.initTaleHeight()
      window.addEventListener('resize', function() {
        that.initTaleHeight()
      })
    },
    data() {
      return {
        tableData: [],
        loading: false,
        tableHeight: '500px',
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          offset: 0,
          selectOperationType: '',
          selectApplication: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    methods: {
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          queryWmsErpAsnHeadList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, {}).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              this.total = res.data.total
              that.loading = false
              if (this.asnHeadFlag == 0) {
                let first = that.tableData[0]
                this.$store.dispatch('inbound/setAsnHeadId', first.headId)
              }
            }
          })
          that.loading = false
        }, 500)
      },
      initTaleHeight() {
        const topViewHeight = document.getElementById('topView').offsetHeight
        if (topViewHeight) {
          this.$nextTick(() => {
            // 50 表格上方按钮区域高度  120 分页组件区域高度
            this.tableHeight = topViewHeight - this.$refs.table.$el.offsetTop - 120
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'asnHeadFlag'
      ])
    }
  }
</script>

<style scoped>
    .head-wrapper > .el-button {
        float: right;
        margin-right: 3px;
    }
</style>
