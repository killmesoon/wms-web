<template>
    <div style="position: relative;">
        <div class="button-wrapper">
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
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteHeadList"> 批量删除</el-button>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="outboundOrderAdd"> 录入</el-button>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="searchOutbound">查询</el-button>
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
                <el-table-column
                        type="selection"
                        width="30">
                </el-table-column>
                <el-table-column prop="docNumber" label="单据号">
                </el-table-column>
                <el-table-column prop="realDocType" label="单据类型">
                </el-table-column>
                <el-table-column prop="realDocStatus" label="单据状态">
                </el-table-column>
                <el-table-column prop="plantId" label="所在工厂">
                </el-table-column>
                <el-table-column prop="realSourceDocType" label="来源单据类型">
                </el-table-column>
                <el-table-column prop="sourceDocNum" label="来源单据号">
                </el-table-column>
                <el-table-column prop="planTime" label="计划日期">
                </el-table-column>
                <el-table-column prop="rfidFlag" label="RFID同步">
                    <template slot-scope="scope">
                        <div>{{scope.row.rfidFlag ? 'Y' : 'N'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="erpFlag" label="同步ERP">
                    <template slot-scope="scope">
                        <div>{{scope.row.erpFlag ? 'Y' : 'N'}}</div>
                    </template>
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
        <el-dialog :visible.sync="dialogHeadVisible" width="50%" :title="dialogTitle" :close-on-click-modal="closeFlag" @close="resetAll">
            <outbound-order-add :form="form" :flag="searchFlag" ref="outboundOrderAdd"></outbound-order-add>
            <outbound-line-add @event1="getFromSon" v-if="!searchFlag" :data="orderLineList"></outbound-line-add>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import DatePeriodSelect from '@/components/Search/DatePeriodSelect'
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import Pagination from '@/components/Pagination'
  import OutboundOrderAdd from './OutboundOrderAdd'
  import OutboundLineAdd from './OutboundLineAdd'
  import {getOutBoundOrderList , saveOrUpdateOutboundHead ,deleteOutboundOrderLinesByHeadId ,saveOrUpdateOutboundOrderLineList , deleteOutboundHeadByHeadId ,findOutboundOrderLineListByHeadId, deleteOutboundHeadList} from '../../../api/outbound/outbound'
  import { Message } from 'element-ui'

  export default {
    name: 'OutboundHeadTable',
    components:{
      DatePeriodSelect,
      KeyWordSearch,
      Pagination,
      OutboundOrderAdd,
      OutboundLineAdd
    },
    data() {
      return {
        loading: false,
        dialogHeadVisible: false,
        closeFlag: false,
        searchFlag: false,
        tableData: [],
        test: '',
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
        total: 4,
        form: {},
        dialogTitle: '出库单录入',
        formLine: {},
        addOrderLineData: [],
        orderLineList: []
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
        const topViewHeight = document.getElementById('topView').offsetHeight
        if (topViewHeight) {
          this.$nextTick(() => {
            // 50 表格上方按钮区域高度  120 分页组件区域高度
            this.tableHeight = topViewHeight - this.$refs.table.$el.offsetTop - 120
          })
        }
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
      },

      handleCurrentChange(val) {
        if (val != null) {
          let id = parseInt(val.headId)
          this.$store.dispatch('inbound/setOutboundHeadId', id)
        }
      },

      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          getOutBoundOrderList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, {}).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              that.loading = false
              if (res.data.records.length > 0) {
                let first = that.tableData[0]
                this.$store.dispatch('inbound/setOutboundHeadId', first.headId)
              }
            }
          })
          that.loading = false
        }, 500)
      },
      getFromSon(data) {
        this.addOrderLineData = data
      },
      /**
       * 取消录入
       */
      cancelAdd() {
        this.dialogHeadVisible = false
        this.dialogTitle = '出库单录入'
      },
      confirmSubmit() {
        //提交出库单录入
        let headId
        if (this.searchFlag) {
          let data = JSON.parse(JSON.stringify(this.form))
          setTimeout(() => {
            getOutBoundOrderList({
              current: this.listQuery.page,
              size: this.listQuery.limit
            }, data).then(res => {
              if (res.code == 200) {
                this.tableData = res.data.records
                this.loading = false
                if (res.data.total  ==0) {
                  this.$store.dispatch('inbound/setOutboundHeadId', 0)
                } else {
                  let first = this.tableData[0]
                  this.$store.dispatch('inbound/setOutboundHeadId', first.headId)
                }
                this.form = {}
                this.dialogHeadVisible = false
              }
            })
            this.loading = false
          }, 500)
        } else {
          this.$refs.outboundOrderAdd.$refs.outboundOrderForm.validate((valid) => {
            if (valid) {
              saveOrUpdateOutboundHead(this.form).then(res => {
                headId = res.data
                for (let t of this.addOrderLineData) {
                  t.headId = headId
                }
                deleteOutboundOrderLinesByHeadId(headId).then(res => {
                  saveOrUpdateOutboundOrderLineList(this.addOrderLineData).then(res => {
                    if (res.code == 200) {
                      Message.success(res.msg)
                      this.dialogHeadVisible = false
                      // this.initData()
                      this.notifyLineData()
                      this.form = {}
                      this.addOrderLineData = []
                    } else {
                      Message.error(res.msg)
                    }
                  }).catch(e => {
                    Message.error(e)
                  })
                }).catch(e => {
                  Message.error(e)
                })
              }).catch(e => {
                Message.error(e)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        }
      },
      deleteHeadOrder(item) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOutboundHeadByHeadId(item.headId).then(res => {
            if (res.code == 200) {
              this.initData()
              this.notifyLineData()
              Message.success(res.msg)
            } else {
              Message.error(res.msg)
            }
          }).catch(e => {
            Message.error(e)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      deleteHeadList() {
        let selectList = this.$refs.table.selection
        let headIdList = [] //初始化headIdList
        for (let t of selectList) {
          headIdList.push(t.headId)
        }
        if (headIdList.length > 0) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteOutboundHeadList(headIdList).then(res => {
              if (res.code == 200) {
                this.initData()
                this.notifyLineData()
                Message.success(res.msg)
              } else {
                Message.error(res.msg)
              }
            }).catch(e => {
              Message.error(e)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          Message.error("请至少选择一项")
        }
      },
      outboundOrderAdd() {
        this.dialogHeadVisible = true
        this.searchFlag = false
      },
      searchOutbound() {
        //查询
        this.dialogHeadVisible = true
        this.searchFlag = true
        this.dialogTitle = '出库单查询'
      },
      resetAll() {
        if (!this.searchFlag) {
          this.$refs.outboundOrderAdd.$refs.outboundOrderForm.resetFields()
        }
        this.form = {}
        this.orderLineList = []
      },
      editHeadOrder(data) {
        findOutboundOrderLineListByHeadId({current:1, size:-1},data.headId).then(res =>{
          if (res.code == 200) {
            let t = res.data.records
            this.dialogTitle = '出库单编辑'
            this.form = JSON.parse(JSON.stringify(data))
            this.orderLineList = JSON.parse(JSON.stringify(t))
            this.form.docType = parseInt(data.docType)
            this.form.docStatus = parseInt(data.docStatus)
            this.form.sourceDocType = parseInt(data.sourceDocType)
            this.dialogHeadVisible = true
          } else {
            Message.error(res.msg)
          }
        }).catch(e => {
          Message.error(e)
        })
      },
      notifyLineData() {
        this.$emit('notify', true)
      }
    }
  }
</script>

<style scoped>
    .el-input {
        width: 220px;
    }

    .el-date-range-picker__editor {
        width: 143px;
    }
    .button-wrapper > .el-button {
        float: right;
        margin-right: 3px;
    }
</style>
