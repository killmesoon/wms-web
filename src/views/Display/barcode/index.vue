<template>
    <div ref="mainContent" class="main-content">
        <!--        <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item"-->
        <!--                          @getSelectedDate="getSelectedDate"/>-->
        <!--        <el-select v-model="listQuery.selectApplication" placeholder="请选择工厂">-->
        <!--            <el-option-->
        <!--                    v-for="item in plantList"-->
        <!--                    :key="item.plantId"-->
        <!--                    :label="item.plantName"-->
        <!--                    :value="item.plantId"-->
        <!--            />-->
        <!--        </el-select>-->
        <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteOrderList"> 批量删除</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="supplierAdd"> 录入</el-button>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="searchData"> 查询</el-button>
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
                <el-table-column
                        type="selection"
                        width="30">
                </el-table-column>
                <el-table-column prop="barcode" label="工厂编码">
                </el-table-column>
                <el-table-column prop="barcode" label="工厂简称">
                </el-table-column>
                <el-table-column prop="barcode" label="条码号">
                </el-table-column>
                <el-table-column prop="barcodeTypeDic" label="条码类型">
                </el-table-column>
                <el-table-column prop="barcodeStatusDic" label="条码状态">
                </el-table-column>
                <el-table-column prop="supplierCode" label="供应商编码">
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商名称">
                </el-table-column>
                <el-table-column prop="description" label="描述">
                </el-table-column>
                <el-table-column
                        width="180"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit"
                                   @click="editSupplier(scope.row)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete"
                                   @click="deleteSupplier(scope.row)"
                        ></el-button>
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
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="50%" :close-on-click-modal="closeFlag" @close="resetAll">
            <barcode-dialog :data="form" :flag="searchFlag" ref="dialogBarcode"></barcode-dialog>
            <div slot="footer">
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
  import { Message } from 'element-ui'
  import BarcodeDialog from './barcodeDialog'
  import {
    queryBarcodeList,
    saveOrUpdateBarcode,
    deleteBarCodeByIdList,
    deleteBarcodeById
  } from '../../../api/barcode'

  export default {
    name: 'index',
    components: {
      DatePeriodSelect,
      KeyWordSearch,
      Pagination,
      BarcodeDialog
    },
    data() {
      return {
        closeFlag: false,
        tableData: [],
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
        dialogVisible: false,
        dialogTitle: '新增条码',
        form: {},
        tableHeight: 500,
        searchFlag: false
      }
    },
    created() {
      this.initTime()
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
          queryBarcodeList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.form).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              this.total = res.data.total
              that.loading = false
            } else {
              Message.error(res.msg)
            }
          }).catch(e => {
            Message.error(e)
          })
        }, 500)
      },
      supplierAdd() {
        this.dialogVisible = true
        this.form = {}
        this.searchFlag = false
        this.dialogTitle = '新增货位'
      },
      cancelAdd() {
        this.dialogVisible = false
        this.form = {}
      },
      confirmSubmit() {
        // console.log(this.$refs.dialogData.form)
        let form = JSON.parse(JSON.stringify(this.$refs.dialogBarcode.form))
        this.form = form
        if (this.searchFlag) {
          queryBarcodeList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.form).then(res => {
            if (res.code == 200) {
              this.tableData = res.data.records
              this.total = res.data.total
              this.dialogVisible = false
            } else {
              Message.error(res.msg)
            }
          }).catch(e => {
            Message.error(e)
          })
        } else {
          this.$refs.dialogBarcode.$refs.barcodeForm.validate((valid) => {
            if (valid) {
              saveOrUpdateBarcode(this.form).then(res => {
                if (res.code == 200) {
                  Message.success(res.msg)
                  this.form = {}
                  this.dialogVisible = false
                  this.initData()
                } else {
                  Message.error(res.msg)
                }
              }).catch(e => {
                Message.error(e)
              })
            }
          })
        }
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
      deleteOrderList() {
        //批量删除
        let selectList = this.$refs.table.selection
        let headIdList = [] //初始化headIdList
        for (let t of selectList) {
          headIdList.push(t.barcodeId)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBarCodeByIdList(headIdList).then(res => {
            if (res.code == 200) {
              Message.success('删除成功')
              this.initData()
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
      deleteSupplier(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBarcodeById(data.barcodeId).then(res => {
            if (res.code == 200) {
              Message.success(res.msg)
              this.initData()
            } else {
              Message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      searchData() {
        this.form = {}
        this.dialogVisible = true
        this.searchFlag = true
        this.dialogTitle = '区域查询'
      },
      editSupplier(data) {
        this.searchFlag = false
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(data))
        // this.form.enableFlag = this.form.enableFlag ? '1' : '0'
        this.form.barcodeType = parseInt(this.form.barcodeType)
        this.form.barcodeStatus = parseInt(this.form.barcodeStatus)
        this.dialogTitle = '编辑区域'
      },
      resetAll() {
        if (!this.searchFlag) {
          this.$refs.dialogBarcode.$refs.barcodeForm.resetFields()
        }
        this.form = {}
      }
    }
  }
</script>

<style scoped>
    .main-content {
        background: white;
        height: calc(100vh - 84px);
        padding: 10px;
    }
    .main-content > .el-button {
        float: right;
        margin-right: 3px;
    }
</style>
