<template>
    <div class="white-body-view">
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
                <el-table-column prop="lookupcode" label="快码">
                </el-table-column>
                <el-table-column prop="docType" label="类型编码">
                </el-table-column>
                <el-table-column prop="docName" label="类型名称">
                </el-table-column>
                <el-table-column prop="prefix" label="前缀">
                </el-table-column>
                <el-table-column prop="sequenceNum" label="流水位数">
                </el-table-column>
                <el-table-column prop="note" label="描述">
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
            <el-dialog :visible.sync="dialogVisible" width="50%" :title="dialogTitle" :close-on-click-modal="closeFlag"  @close="resetAll">
                <order-dialog :data="form" :flag="searchFlag" ref="orderDialog"></order-dialog>
                <div slot="footer">
                    <el-button @click="cancelAdd">取 消</el-button>
                    <el-button type="primary" @click="confirmSubmit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { queryDocAutoNumber ,saveOrUpdateDocAutoNumber, deleteDocAutoNumberById, deleteDocAutoNumberList } from '../../../../api/data/docNumber'
  import {saveOrUpdateWmsDic} from '../../../../api/dic/dic'
  import { Message } from 'element-ui'
  import OrderDialog from './OrderDialog'

  export default {
    name: 'index',
    created() {
      this.initData()
    },
    components: {
      OrderDialog,
      Pagination
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
        dialogTitle: '新增单据设置',
        form: {},
        tableHeight: 500,
        searchFlag: false
      }
    },
    methods: {
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          queryDocAutoNumber({
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
      cancelAdd() {
        this.dialogVisible = false
        this.form = {}
      },
      confirmSubmit() {
        let t = JSON.parse(JSON.stringify(this.$refs.orderDialog.form))
        this.form = t
        if (this.searchFlag) {
          queryDocAutoNumber({
            current: this.listQuery.page,
            size: this.listQuery.limit
          },this.form).then(res => {
            if (res.code == 200) {
              this.tableData = res.data.records
              this.total = res.data.total
              this.dialogVisible = false
            }
          }).catch(e => {
            Message.error(e)
          })
        } else {
          this.$refs.orderDialog.$refs.dialogForm.validate((valid) => {
            if (valid) {
              let t = {}
              t.docFlag = true
              t.dicId = this.form.dicId
              saveOrUpdateWmsDic(t).then(res => {
                if (res.code == 200) {
                  saveOrUpdateDocAutoNumber(this.form).then(res => {
                    if (res.code == 200) {
                      Message.success(res.msg)
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
            } else {
              return false
            }
          })
        }
      },
      searchData() {
        this.form = {}
        this.searchFlag = true
        this.dialogVisible = true
        this.dialogTitle = '查询单据设置'
      },
      editSupplier(data) {
        this.form = JSON.parse(JSON.stringify(data))
        this.searchFlag = false
        this.dialogTitle = '编辑单据设置'
        this.dialogVisible = true
      },
      resetAll() {
        if (!this.searchFlag) {
          this.$refs.orderDialog.$refs.dialogForm.resetFields()
        }
      },
      deleteOrderList() {
        //批量删除
        let selectList = this.$refs.table.selection
        let headIdList = [] //初始化headIdList
        for (let t of selectList) {
          headIdList.push(t.id)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDocAutoNumberList(headIdList).then(res => {
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
          deleteDocAutoNumberById(data.id).then(res => {
            if (res.code == 200) {
              Message.success(res.msg)
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
      }
    }
  }
</script>

<style scoped>
    .white-body-view > .el-button {
        float: right;
        margin-right: 3px;
    }
</style>
