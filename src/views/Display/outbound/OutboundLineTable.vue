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
                        width="120"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="mini" icon="el-icon-plus" @click="addDetail(scope.row)">
                        </el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteLine(scope.row)">
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
        <el-dialog :visible.sync="dialogLineOrderVisible" title="行信息录入" width="55%"
                   @close="resetAll"
                   :close-on-click-modal="isClose">
            <el-form :model="formLine" size="small" label-position="right" ref="outboundLineForm" :inline="isFormInline">
                <!--                <el-form-item label="行号" :label-width="formLabelWidth">-->
                <!--                    <el-input v-model="formLine.lineNum" autocomplete="off">-->
                <!--                    </el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="物料编码" prop="itemCode" :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择物料编码', trigger: 'change' }]">
                    <el-select v-model="formLine.itemCode" placeholder="请选择物料编码" value-key="itemId" filterable
                               @change="itemCodeChange"
                    >
                        <el-option v-for="item in itemList" :key="item.itemId" :label="item.itemCode" :value="item">
                        </el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="物料描述" :label-width="formLabelWidth">
                    <el-input v-model="formLine.description" :disabled="disable" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="仓库编码" prop="warehouseCode" :rules="[{ required: true, message: '请选择仓库编码', trigger: 'change' }]" :label-width="formLabelWidth">
                    <el-select v-model="formLine.warehouseCode"  placeholder="请选择仓库编码" filterable value-key="warehouseId"
                               @change="wareHouseCodeChange">
                        <el-option v-for="wareHouse in wareHouseList" :key="wareHouse.warehouseId" :label="wareHouse.warehouseCode"
                                   :value="wareHouse">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                    <el-input v-model="formLine.warehouseName" :disabled="disable" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="来源单据类型" :label-width="formLabelWidth">
                    <el-select v-model="formLine.sourceDocType" placeholder="请选择来源单据类型">
                        <el-option v-for="item in dicSourceOrderTypeList" :key="item.dicCode" :label="item.dicName"
                                   :value="item.dicId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位" prop="uom" :rules="[{ required: true, message: '请选择单位', trigger: 'change' }]" :label-width="formLabelWidth">
                    <el-select v-model="formLine.uom" filterable placeholder="请选择单位">
                        <el-option v-for="item in uomList" :key="item.uomId" :label="item.uomCode"
                                   :value="item.uomCode">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划数量" prop="planQty" :rules="[{ required: true, message: '请输入计划数量', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.planQty" type="number" placeholder="请输入计划数量"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源单据行号" :label-width="formLabelWidth">
                    <el-input v-model="formLine.sourceLineNum" type="number" placeholder="请输入来源单据行号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源单据号" :label-width="formLabelWidth">
                    <el-input v-model="formLine.sourceDocNum" type="number" placeholder="请输入来源单据号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formLine.note" placeholder="请输入备注" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addSingleLine">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogDetailVisible" :title="dialogDetailTitle" width="60%" :close-on-click-modal="closeFlag" >
            <outbound-detail-dialog :line="lineItem" @event1="getFromSon" ref="inboundDetailDialog" :data="orderDetailList"></outbound-detail-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDetailVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmitDetail">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import DatePeriodSelect from '@/components/Search/DatePeriodSelect'
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import Pagination from '@/components/Pagination'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { getItemList } from '../../../api/data/data'
  import { getWareHouseList } from '../../../api/model/warehouse'
  import { getUomList } from '../../../api/data/uom'
  import {findOutboundOrderLineListByHeadId ,saveOrUpdateOutboundOrderLine , deleteOutboundLineById, findOutboundOrderDetailList ,saveOrUpdateDetailList} from '../../../api/outbound/outbound'
  import OutboundDetailDialog from './OutboundDetailDialog'

  export default {
    name: 'OutboundLineTable',
    components: {
      OutboundDetailDialog,
      DatePeriodSelect,
      Pagination,
      KeyWordSearch
    },
    data() {
      return {
        loading: false,
        tableData: [],
        tableHeight: 100,
        disable: true,
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
        dialogLineOrderVisible: false,
        isFormInline: true,
        isClose: false,
        formLabelWidth: '100px',
        itemList: [],
        wareHouseList: [],
        uomList: [],
        applyToBody: true,
        formLine: {},
        addOrderLineData: [],
        gridData: [],
        dialogDetailVisible: false,
        dialogDetailTitle: '出库单明细录入',
        closeFlag: false,
        lineItem: {},
        orderDetailList: []
      }
    },
    created() {
      this.initTime()
      getItemList({
        current: 1,
        size: -1
      }, {}).then(res => {
        if (res.code == 200) {
          this.itemList = res.data.records
          this.gridData = res.data.records
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
      getWareHouseList({
        current: 1,
        size: -1
      }, {}).then(res => {
        if (res.code == 200) {
          this.wareHouseList = res.data.records
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
      getUomList({
        current: 1,
        size: -1
      }, {}).then(res => {
        if (res.code == 200) {
          this.uomList = res.data.records
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
    },
    methods: {
      initTime() {
        this.listQuery.startTime = this.$moment().subtract('days', 30).format('YYYY-MM-DD')
        this.listQuery.endTime = this.$moment().format('YYYY-MM-DD')
        this.selectedDate = [this.listQuery.startTime, this.listQuery.endTime]
        this.initData()
      },
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          findOutboundOrderLineListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.outboundHeadIdFlag).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              that.loading = false
            }
          })
          that.loading = false
        }, 500)
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
      lineAdd() {
        this.formLine = {}
        this.dialogLineOrderVisible = true
      },
      itemCodeChange(e) {
        this.formLine.itemCode = e.itemCode
        this.formLine.description = e.description
        this.formLine.itemId = e.itemId
      },
      wareHouseCodeChange(e) {
        this.formLine.warehouseCode = e.warehouseCode
        this.formLine.warehouseName = e.warehouseName
        this.formLine.warehouseId = e.warehouseId
      },
      cancelAdd() {
        this.dialogLineOrderVisible = false
        this.formLine = {}
      },
      addSingleLine() {
        this.formLine.headId = this.outboundHeadIdFlag
        this.$refs.outboundLineForm.validate((valid) => {
          if (valid) {
            saveOrUpdateOutboundOrderLine(this.formLine).then(res => {
              if (res.code == 200) {
                Message.success(res.msg)
                this.dialogLineOrderVisible = false
                this.initData()
                this.formLine = {}
              } else {
                Message.error(res.msg)
              }
            }).catch(e => {
              Message.error(e)
            })
          }
        })
      },
      deleteLine(item) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOutboundLineById(item.lineId).then(res => {
            if (res.code == 200) {
              Message.success(res.msg)
              this.initData()
            } else {
              Message.error(res.msg)
            }
          }).catch(e => {
            Message.error(e)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        })
      },
      handleCurrentChange(val) {
        this.$set(this.formLine, 'description',val.description)
        this.$set(this.formLine, 'itemCode', val.itemCode)
        this.$set(this.formLine, 'itemId', val.itemId)
        this.$refs.proFlag.doClose()
      },
      resetAll() {
        this.$refs.outboundLineForm.resetFields()
      },
      addDetail(data) {
        this.lineItem = data
        findOutboundOrderDetailList({
          current: 1,
          size: -1
        }, data).then(res => {
          if (res.code == 200) {
            this.orderDetailList = res.data.records
            this.dialogDetailVisible = true
          } else {
            Message.error(res.msg)
          }
        })
      },
      getFromSon(data) {
        this.orderDetailList = data
      },
      confirmSubmitDetail() {
        //提交
        if (this.orderDetailList.length > 0) {
          saveOrUpdateDetailList(this.lineItem.lineId ,this.orderDetailList).then(res => {
            if (res.code == 200) {
              Message.success(res.msg)
              this.dialogDetailVisible = false
              this.orderDetailList = []
              this.$emit('changeTab', 'second')
            } else {
              Message.error(res.msg)
            }
          })
        } else {
          Message.error("请添加明细信息")
        }
      }
    },
    computed: {
      ...mapGetters([
        'outboundHeadIdFlag',
        'dicSourceOrderTypeList'
      ])
    },
    watch: {
      outboundHeadIdFlag: {
        handler(newVal, oldValue) {
          this.loading = true
          findOutboundOrderLineListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.outboundHeadIdFlag).then(res => {
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
    .line-wrapper > .el-button {
        float: right;
        margin-right: 3px;
    }
</style>
