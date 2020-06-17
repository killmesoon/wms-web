<template>
    <div ref="mainContent" class="main-content">
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteOrderList" :disabled="deleteListFlag"> 批量删除</el-button>
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
                    @select="selectEvent"
                    @select-all="selectEvent"
            >
                <el-table-column
                        type="selection"
                        width="30">
                </el-table-column>
                <el-table-column prop="eventTypeCode" label="类型编码">
                </el-table-column>
                <el-table-column prop="eventTypeName" label="类型名称">
                </el-table-column>
                <el-table-column prop="calculatorFlag" align="center" label="是否库存变化">
                    <template slot-scope="scope">
                        <span>{{scope.row.primaryFlag ? 'Y': 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="calculatorTypeDic" label="库存变化类型">
                </el-table-column>
                <el-table-column prop="enableFlag" align="center" label="是否有效">
                    <template slot-scope="scope">
                        <span>{{scope.row.enableFlag ? 'Y': 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="isSystem" align="center" label="是否系统录入">
                    <template slot-scope="scope">
                        <span>{{scope.row.isSystem ? 'Y': 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="eventPackInfo" label="事件包信息">
                </el-table-column>
                <el-table-column prop="description" label="描述">
                </el-table-column>
                <el-table-column
                        width="180"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit"
                                   :disabled="scope.row.isSystem"
                                   @click="editSupplier(scope.row)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete"
                                   :disabled="scope.row.isSystem"
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
        <el-dialog :visible.sync="dialogVisible" width="50%" :title="dialogTitle" :close-on-click-modal="closeFlag"
                   @close="resetAll">
            <event-type-dialog :data="form" :flag="searchFlag" ref="eventTypeDialog"></event-type-dialog>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { Message } from 'element-ui'
  import {queryWmsObjectEventTypeList , saveOrUpdateWmsObjectEventType, deleteWmsObjectEventType ,deleteWmsObjectEventTypeById} from '../../../../api/data/event'
  import EventTypeDialog from './EventTypeDialog'

  export default {
    name: 'index',
    components: {
      EventTypeDialog,
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
        dialogTitle: '新增事件类型',
        form: {},
        tableHeight: 500,
        searchFlag: false,
        deleteListFlag: false
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          queryWmsObjectEventTypeList({
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
      searchData() {
        this.form = {}
        this.dialogVisible = true
        this.searchFlag = true
        this.dialogTitle = '事件类型查询'
      },
      supplierAdd() {
        this.dialogVisible = true
        this.form = {}
        this.searchFlag = false
        this.dialogTitle = '新增事件类型'
      },
      deleteOrderList() {
        //批量删除
        let selectList = this.$refs.table.selection
        let headIdList = [] //初始化headIdList
        for (let t of selectList) {
          headIdList.push(t.eventTypeId)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWmsObjectEventType(headIdList).then(res => {
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
      },
      editSupplier(data) {
        this.searchFlag = false
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(data))
        this.form.enableFlag = this.form.enableFlag ? '1' : '0'
        this.form.isSystem = this.form.isSystem ? '1' : '0'
        this.form.calculatorFlag = this.form.calculatorFlag ? '1' : '0'
        this.form.calculatorType = parseInt(this.form.calculatorType)
        this.dialogTitle = '编辑事件类型'
      },
      deleteSupplier(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWmsObjectEventTypeById(data.eventTypeId).then(res => {
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
      },
      resetAll() {
        if (!this.searchFlag) {
          this.$refs.eventTypeDialog.$refs.eventTypeForm.resetFields()
        }
        this.form = {}
      },
      confirmSubmit() {
        let t = JSON.parse(JSON.stringify(this.$refs.eventTypeDialog.form))
        this.form = t
        if (this.form.enableFlag != null) {
          this.form.enableFlag = parseInt(this.form.enableFlag)
        }
        if (this.form.isSystem != null) {
          this.form.isSystem = parseInt(this.form.isSystem)
        }
        if (this.form.calculatorFlag != null) {
          this.form.calculatorFlag = parseInt(this.form.calculatorFlag)
        }
        if (this.searchFlag) {
          //查询
          queryWmsObjectEventTypeList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, this.form).then(res => {
            if (res.code == 200) {
              this.total = res.data.total
              this.dialogVisible = false
              this.tableData = res.data.records
            } else {
              Message.error(res.msg)
            }
          }).catch(e => {
            Message.error(e)
          })
        } else {
          this.$refs.eventTypeDialog.$refs.eventTypeForm.validate((valid) => {
            if (valid) {
              saveOrUpdateWmsObjectEventType(this.form).then(res => {
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
            } else {
              return false
            }
          })
        }
      },
      selectEvent(selection, row) {
        this.deleteListFlag = false
        for (let t of selection) {
          if (t.isSystem) {
            this.deleteListFlag = true
            return
          }
        }
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
