<template>
    <div ref="mainContent" class="main-content">
        <el-button type="danger"  size="mini" icon="el-icon-delete" @click="deleteOrderList"> 批量删除</el-button>
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
                <el-table-column prop="supplierCode" label="供应商编码">
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商名称">
                </el-table-column>
                <el-table-column prop="shortName" label="供应商简称">
                </el-table-column>
                <el-table-column prop="supplierTypeDic" label="供应商类型">
                </el-table-column>
                <el-table-column prop="supplierStatusDic" label="供应商状态">
                </el-table-column>
                <el-table-column prop="address" label="供应商地址">
                </el-table-column>
                <el-table-column prop="contact" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="mail" label="邮箱">
                </el-table-column>
                <el-table-column prop="note" label="备注">
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
        <el-dialog :visible.sync="dialogVisible" width="50%" :title="dialogTitle" :close-on-click-modal="closeFlag"  @close="resetAll">
            <supplier-dialog :data="form" :flag="searchFlag" ref="supplierDialog"></supplier-dialog>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import DatePeriodSelect from '@/components/Search/DatePeriodSelect'
  import KeyWordSearch from '@/components/Search/KeyWordSearch'
  import Pagination from '@/components/Pagination'
  import SupplierDialog from './SupplierDialog'
  import { Message } from 'element-ui'
  import {
    findSupplierList,
    saveOrUpdateSupplier,
    deleteSupplierById,
    deleteSupplierList
  } from '../../../../api/data/supplier'

  export default {
    name: 'index',
    components: {
      DatePeriodSelect,
      Pagination,
      KeyWordSearch,
      SupplierDialog
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
        dialogTitle: '新增供应商',
        form: {},
        tableHeight: 500,
        searchFlag: false,
        editFlag: false
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
          findSupplierList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, {}).then(res => {
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
      },
      confirmSubmit() {
        let t = JSON.parse(JSON.stringify(this.$refs.supplierDialog.form))
        this.form = t
        if (this.searchFlag) {
          findSupplierList({
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
          this.$refs.supplierDialog.$refs.supplierForm.validate((valid) => {
            if (valid) {
              saveOrUpdateSupplier(this.form).then(res => {
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
            } else {
              return false
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
          headIdList.push(t.supplierId)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSupplierList(headIdList).then(res => {
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
          deleteSupplierById(data.supplierId).then(res => {
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
        this.dialogTitle = '供应商查询'
      },
      editSupplier(data) {
        this.searchFlag = false
        this.dialogVisible = true
        this.editFlag = true
        this.form = JSON.parse(JSON.stringify(data))
        this.form.supplierType = parseInt(this.form.supplierType)
        this.form.supplierStatus = parseInt(this.form.supplierStatus)
        this.dialogTitle = '编辑供应商'
      },
      resetAll() {
        if (!this.searchFlag) {
          this.$refs.supplierDialog.$refs.supplierForm.resetFields()
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
