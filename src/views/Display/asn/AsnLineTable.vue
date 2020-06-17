<template>
    <div style="position: relative;">
        <div class="line-wrapper">
            <!--            <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item"-->
            <!--                              @getSelectedDate="getSelectedDate"/>-->

            <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteList"> 批量删除</el-button>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogLineVisible = true"> 录入</el-button>
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
                <el-table-column align="center" prop="lineNum" label="行号">
                </el-table-column>
                <el-table-column prop="itemCode" label="物料编码">
                </el-table-column>
                <el-table-column prop="description" label="物料描述">
                </el-table-column>
                <el-table-column prop="warehouseCode" label="仓库编码">
                </el-table-column>
                <el-table-column prop="warehouseName" label="仓库名称">
                </el-table-column>
                <el-table-column prop="sourcePoDic" label="来源单据类型">
                </el-table-column>
                <el-table-column prop="sourceLine" label="来源单据号">
                </el-table-column>
                <el-table-column prop="uom" label="单位">
                </el-table-column>
                <el-table-column prop="planQty" label="计划数量">
                </el-table-column>
                <el-table-column align="center" prop="receiveQty" label="接收数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.receiveQty ? scope.row.receiveQty : '-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="qcOkQty" label="合格数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.qcOkQty ? scope.row.qcOkQty : '-'}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="completeFlag" label="完成标识">
                    <template slot-scope="scope">
                        <span>{{scope.row.completeFlag ? 'Y' : 'N'}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="completeDate" label="完成时间">
                </el-table-column>

                <el-table-column prop="note" label="备注">
                </el-table-column>
                <el-table-column
                        width="120"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="mini" icon="el-icon-plus" @click="addDetail(scope.row)">
                        </el-button>
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
        <el-dialog :visible.sync="dialogDetailVisible" :title="dialogDetailTitle" width="60%" :close-on-click-modal="closeFlag" @close="resetAll">
            <asn-detail-dialog  :data="orderDetailList" :line="lineItem" @event1="getFromSon" ref="asnDetailDialog"></asn-detail-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDetailVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmitDetail">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog  :visible.sync="dialogLineVisible" ref="lineDialog" title="行信息录入" :close-on-click-modal="closeFlag" @close="resetLine">
            <el-form :model="formLine" size="small"  label-position="right" ref="asnLineForm" :inline="isFormInline">
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
                <el-form-item label="入库仓库" prop="warehouseCode" :rules="[{ required: true, message: '请选择仓库编码', trigger: 'change' }]" :label-width="formLabelWidth">
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
                <el-form-item label="来源单据类型"  :label-width="formLabelWidth">
                    <el-select v-model="formLine.sourcePo" value-key="dicId"  placeholder="请选择来源单据类型">
                        <el-option v-for="item in dicSourceOrderTypeList" :key="item.dicCode" :label="item.dicName"
                                   :value="item.dicId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源单据号" :label-width="formLabelWidth">
                    <el-input type="number"  v-model="formLine.sourceLine" placeholder="请输入来源单据号" autocomplete="off"></el-input>
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
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formLine.note" placeholder="请输入备注" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLineVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmitLine">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { getItemList } from '../../../api/data/data'
  import { getWareHouseList } from '../../../api/model/warehouse'
  import { getUomList } from '../../../api/data/uom'
  import { queryWmsErpAsnLineListByHeadId, queryWmsErpAsnDetailList, saveOrUpdateWmsErpAsnLine , saveOrUpdateDetailList ,deleteWmsErpAsnLineById ,deleteWmsErpAsnLineList } from '../../../api/asn'
  import AsnDetailDialog from './AsnDetailDialog'
  export default {
    name: 'AsnLineTable',
    created() {
      this.initData(),
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
    components: {
      AsnDetailDialog,
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
        dialogDetailVisible: false,
        dialogDetailTitle: '送货单明细录入',
        closeFlag: false,
        orderDetailList:[],
        dialogLineVisible: false,
        formLine: {},
        formLabelWidth: '100px',
        isFormInline: true,
        itemList: [],
        wareHouseList: [],
        uomList: [],
        lineItem: {}
      }
    },
    mounted() {
      const that = this
      this.initTaleHeight()
      window.addEventListener('resize', function() {
        that.initTaleHeight()
      })
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
              for (let t of that.tableData) {
                // receiveQty
                if (t.planQty == t.receiveQty) {
                  t.completeFlag = true
                }
              }
              this.total =res.data.total
              if (that.tableData.length > 0) {
                this.lineItem = that.tableData[0]
              }
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
      addDetail(data) {
        this.lineItem = data
        queryWmsErpAsnDetailList({
          current: 1,
          size: -1
        },data).then(res => {
          if (res.code == 200) {
            this.orderDetailList = res.data.records
            this.dialogDetailVisible = true
          } else {
            Message.error(res.msg)
          }
        })
      },
      resetLine() {
        this.$refs.asnLineForm.resetFields()
        this.formLine = {}
      },
      resetAll() {
        // this.$refs.asnDetailDialog.resetFields()
        // console.log(this.$refs.asnDetailDialog)
      },
      confirmSubmitLine() {
        let t = JSON.parse(JSON.stringify(this.formLine))
        t.headId = this.asnHeadFlag
        //提交
        t.lineNum = (this.total + 1) * 10
        this.$refs.asnLineForm.validate((valid) => {
          if (valid) {
            saveOrUpdateWmsErpAsnLine(t).then(res => {
              if (res.code == 200) {
                Message.success(res.msg)
                this.dialogLineVisible = false
                this.initData()
                this.formLine = {}
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
      },
      confirmSubmitDetail() {
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
          }).catch(e => {
            Message.error(e)
          })
        } else {
          Message.error("请添加明细信息")
        }
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
      getFromSon(data) {
        this.orderDetailList = data
      },
      deleteLine(data) {
        //删除行信息 连带明细
        this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWmsErpAsnLineById(data.lineId).then(res => {
            if (res.code == 200) {
              Message.success(res.msg)
              this.$emit('changeTab', 'first')
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
      deleteList() {
        //批量删除行信息 ，带明细
        //删除行信息 连带明细
        this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let selectList = this.$refs.table.selection
          let lineIdList = [] //初始化headIdList
          for (let t of selectList) {
            lineIdList.push(t.lineId)
          }
          deleteWmsErpAsnLineList(lineIdList).then(res => {
            if (res.code == 200) {
              Message.success(res.msg)
              this.$emit('changeTab', 'first')
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
      }
    },
    computed: {
      ...mapGetters([
        'asnHeadFlag',
        'dicSourceOrderTypeList'
      ])
    },
    watch: {
      asnHeadFlag: {
        handler(n , o) {
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
