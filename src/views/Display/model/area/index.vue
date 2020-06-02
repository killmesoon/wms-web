<template>
    <div ref="mainContent" class="main-content">
        <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item"
                          @getSelectedDate="getSelectedDate"/>
        <el-select v-model="listQuery.selectApplication" placeholder="请选择工厂">
            <el-option
                    v-for="item in plantList"
                    :key="item.plantId"
                    :label="item.plantName"
                    :value="item.plantId"
            />
        </el-select>
        <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->
        <el-button type="primary" icon="el-icon-plus" @click="supplierAdd"> 录入</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteOrderList"> 批量删除</el-button>
        <el-button type="primary" icon="el-icon-search" @click="searchData"> 查询</el-button>
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
                <el-table-column prop="warehouseCode" label="工厂编码">
                </el-table-column>
                <el-table-column prop="warehouseCode" label="工厂名称">
                </el-table-column>
                <el-table-column prop="warehouseCode" label="仓库编码">
                </el-table-column>
                <el-table-column prop="warehouseShortName" label="仓库简称">
                </el-table-column>
                <el-table-column prop="areaCode" label="区域编码">
                </el-table-column>
                <el-table-column prop="areaName" label="区域名称">
                </el-table-column>
                <el-table-column prop="areaTypeDic" label="区域类型">
                </el-table-column>
                <el-table-column prop="enableFlag" label="是否有效">
                    <template slot-scope="scope">
                        {{scope.row.enableFlag ? 'Y' : 'N'}}
                    </template>
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
        <el-dialog :visible.sync="dialogVisible" width="50%" :close-on-click-modal="closeFlag">
            <div slot="title" class="dialog-head">{{dialogTitle}}</div>
            <area-dialog :data="form" :flag="searchFlag" ref="dialogArea"></area-dialog>
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
  import AreaDialog from './AreaDialog'

  import {
    saveOrUpdateWarehouseAreaList,
    queryWarehouseAreaList,
    deleteWarehouseAreaList,
    deleteWarehouseAreaById
  } from '../../../../api/data/area'

  export default {
    name: 'index',
    components: {
      DatePeriodSelect,
      KeyWordSearch,
      Pagination,
      AreaDialog
    },
    data() {
      return {
        closeFlag: false,
        tableData: [],
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一场',
            plantCode: 'WGQ1'
          },
          {
            id: 2,
            plantId: 2,
            plantName: '上海外高桥二场',
            plantCode: 'WGQ2'
          }
        ],
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
        dialogTitle: '新增区域',
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
          queryWarehouseAreaList({
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
        this.form = {
          wareHouse: {},
          area: {}
        }
        this.dialogTitle = '新增区域'
        this.searchFlag = false
      },
      cancelAdd() {
        this.dialogVisible = false
        this.form = {
          wareHouse: {},
          area: {}
        }
      },
      confirmSubmit() {
        // console.log(this.$refs.dialogData.form)
        let form = JSON.parse(JSON.stringify(this.$refs.dialogArea.form))
        this.form = form
        if (this.form.enableFlag != null) {
          this.form.enableFlag = parseInt(this.form.enableFlag)
        }
        if (this.searchFlag) {
          queryWarehouseAreaList({
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
          this.$refs.dialogArea.$refs.areaForm.validate((valid) => {
            if (valid) {
              saveOrUpdateWarehouseAreaList(this.form).then(res => {
                if (res.code == 200) {
                  Message.success(res.msg)
                  this.form = {
                    wareHouse: {}
                  }
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
          headIdList.push(t.areaId)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWarehouseAreaList(headIdList).then(res => {
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
          deleteWarehouseAreaById(data.areaId).then(res => {
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
        this.form = {
          wareHouse: {}
        }
        this.dialogVisible = true
        this.searchFlag = true
        this.dialogTitle = '区域查询'
      },
      editSupplier(data) {
        this.searchFlag = false
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(data))
        this.form.enableFlag = this.form.enableFlag ? '1' : '0'
        this.dialogTitle = '编辑区域'
      }
    }
  }
</script>

<style scoped>
    .main-content {
        background: white;
        height: calc(100vh - 84px);
    }
</style>
