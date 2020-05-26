<template>
    <div style="position: relative;">
        <div>
            <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item"
                              @getSelectedDate="getSelectedDate"/>

            <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
            <el-button type="primary" icon="el-icon-plus" @click="lineAdd"> 录入</el-button>
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
        <el-dialog :visible.sync="dialogLineOrderVisible" width="55%"
                   :close-on-click-modal="isClose">
            <div slot="title" class="dialog-head"><span>行信息录入</span></div>
            <el-form :model="formLine" size="small" label-position="left" :inline="isFormInline">
                <el-form-item label="行号" :label-width="formLabelWidth">
                    <el-input v-model="formLine.lineNum" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="物料编码" :label-width="formLabelWidth">
                    <el-select v-model="formLine.item" placeholder="请输入物料编码" value-key="itemId" filterable
                               @change="itemCodeChange">
                        <el-option v-for="item in itemList" :key="item.itemId" :label="item.itemCode" :value="item">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物料描述" :label-width="formLabelWidth">
                    <el-input v-model="formLine.description" readonly="readonly" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="仓库编码" :label-width="formLabelWidth">
                    <el-select v-model="formLine.wareHouse" placeholder="请输入仓库编码" filterable value-key="warehouseId"
                               @change="wareHouseCodeChange">
                        <el-option v-for="item in wareHouseList" :key="item.warehouseId" :label="item.warehouseCode"
                                   :value="item">

                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :model="formLine" size="small" label-position="left" :inline="isFormInline">
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                    <el-input v-model="formLine.warehouseName" readonly="readonly" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="来源单据类型" :label-width="formLabelWidth">
                    <el-select v-model="formLine.sourceDocType" placeholder="请选择来源单据类型">
                        <el-option v-for="item in dicSourceOrderTypeList" :key="item.dicCode" :label="item.dicName"
                                   :value="item.dicId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth">
                    <el-select v-model="formLine.uom" filterable placeholder="请选择单位">
                        <el-option v-for="item in uomList" :key="item.uomId" :label="item.uomCode"
                                   :value="item.uomCode">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划数量" :label-width="formLabelWidth">
                    <el-input v-model="formLine.planQty" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="formLine" size="small" label-position="left" :inline="isFormInline">
                <el-form-item label="来源单据行号" :label-width="formLabelWidth">
                    <el-input v-model="formLine.sourceLineNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源单据号" :label-width="formLabelWidth">
                    <el-input v-model="formLine.sourceDocNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formLine.note" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addSingleLine">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import DatePeriodSelect from '@/components/Search/DatePeriodSelect'
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import Pagination from '@/components/Pagination'
  import { findInboundLineListByHeadId, deleteLineById , saveOrUpdateOrderLine} from '../../../api/inbound'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { getItemList } from '../../../api/data/data'
  import { getWareHouseList } from '../../../api/model/warehouse'
  import { getUomList } from '../../../api/data/uom'

  export default {
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
        total: 0,
        dialogLineOrderVisible: false,
        isFormInline: true,
        isClose: false,
        formLabelWidth: '100px',
        itemList: [],
        wareHouseList: [],
        uomList: [],
        applyToBody: true,
        formLine: {},
        addOrderLineData: []
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
          findInboundLineListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.headIdFlag).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              this.total =res.data.total
              that.loading = false
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
      },

      /**
       * 删除行
       * @param lineId
       */
      deleteLine(item) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLineById(item.lineId).then(res => {
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
        this.formLine.headId = this.headIdFlag
        //提交
        saveOrUpdateOrderLine(this.formLine).then(res => {
          if (res.code == 200) {
            Message.success(res.msg)
            this.dialogLineOrderVisible = false
            this.initData()
          } else {
            Message.error(res.msg)
          }
        }).catch(e => {
          Message.error(e)
        })
      }

    },
    computed: {
      ...mapGetters([
        'headIdFlag',
        'dicSourceOrderTypeList'
      ])
    },
    watch: {
      headIdFlag: {
        handler(newVal, oldValue) {
          this.loading = true
          findInboundLineListByHeadId({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.headIdFlag).then(res => {
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

<style>

</style>
