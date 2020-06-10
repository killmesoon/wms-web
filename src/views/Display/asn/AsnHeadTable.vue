<template>
    <div>
        <div style="position: relative;">
            <div class="head-wrapper">
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
        <el-dialog :visible.sync="dialogHeadVisible" :title="dialogTitle" width="50%" :close-on-click-modal="closeFlag" @close="resetAll">
            <asn-head-add :data="form" :flag="searchFlag" ref="asnDialog"></asn-head-add>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogHeadVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { queryWmsErpAsnHeadList , saveOrUpdateWmsErpAsnHead } from '../../../api/asn'
  import {mapGetters} from 'vuex'
  import AsnHeadAdd from './AsnHeadAdd'
  import {Message} from 'element-ui'

  export default {
    name: 'AsnHeadTable',
    created() {
      this.initData()
    },
    components: {
      AsnHeadAdd,
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
        dialogTitle: '新增送货单',
        dialogHeadVisible: false,
        closeFlag: false,
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
        },
        searchFlag: false,
        form: {},
        formLine: {},
        addOrderLineData: [],
        orderLineList: []
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
      },
      inboundAdd() {
        this.dialogHeadVisible = true
        this.searchFlag = false
      },
      searchInbound() {
        //查询
        this.dialogHeadVisible = true
        this.searchFlag = true
        this.dialogTitle = '送库单查询'
      },
      confirmSubmit() {
        let t = JSON.parse(JSON.stringify(this.$refs.asnDialog.form))
        this.form = t
        if (this.form.isEmergency) {
          this.form.isEmergency = parseInt(this.form.isEmergency)
        }
        if (this.searchFlag) {
          this.dialogHeadVisible = false
          const that = this
          this.loading = true
          if (this.form.planDeliverDateRange) {
            this.form.planStartDate = this.form.planDeliverDateRange[0]
            this.form.planEndDate = this.form.planDeliverDateRange[1]
          }
          setTimeout(() => {
            queryWmsErpAsnHeadList({
              current: this.listQuery.page,
              size: this.listQuery.limit
            }, this.form).then(res => {
              if (res.code == 200) {
                that.tableData = res.data.records
                this.total = res.data.total
                that.loading = false
                if (this.asnHeadFlag == 0) {
                  let first = that.tableData[0]
                  this.$store.dispatch('inbound/setAsnHeadId', first.headId)
                }

                this.form = {}
              }
            })
            that.loading = false
          }, 500)
        } else {
          this.$refs.asnDialog.$refs.asnOrderForm.validate((valid) => {
            if (valid) {
              saveOrUpdateWmsErpAsnHead(this.form).then(res => {
                if (res.code == 200) {
                  Message.success(res.msg)
                  this.dialogHeadVisible = false
                  this.initData()
                } else {
                  Message.error(res.msg)
                }
              }).catch(e => {
                Message.error(e)
              })
            } else {
              return false
            }
          })
        }
      },
      deleteOrderList() {

      },
      deleteHeadOrder(data) {

      },
      resetAll() {
        if (!this.searchFlag) {
          this.$refs.asnDialog.$refs.asnOrderForm.resetFields()
        }
        this.form = {}
        this.orderLineList = []
      },
      handleCurrentChange(val) {
        if (val != null) {
          let id = parseInt(val.headId)
          this.$store.dispatch('inbound/setAsnHeadId', id)
        }
      },
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
