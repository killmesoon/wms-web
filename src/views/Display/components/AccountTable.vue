<template>
    <div style="position: relative;">
        <div>
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
            <el-button type="primary" icon="el-icon-plus" @click="inboundAdd"> 录入</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteOrderList"> 批量删除</el-button>
            <el-button type="primary" icon="el-icon-search" @click="searchInbound"> 查询</el-button>
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
        <el-dialog :visible.sync="dialogHeadVisible" width="50%" :close-on-click-modal="closeFlag">
            <div slot="title" class="dialog-head">
                <span>{{dialogTitle}}</span>
            </div>
            <inbound-order-add :form="form" :flag="searchFlag" ref="inboundOrderAdd"></inbound-order-add>
            <inbound-line-add @event1="getFromSon" v-if="!searchFlag"></inbound-line-add>
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
  import InboundOrderAdd from '../inbound/component/InboundOrderAdd'
  import InboundLineAdd from '../inbound/component/InboundLineAdd'
  import {
    findInboundList,
    deleteHeadById,
    saveOrUpdateInboundHead,
    deleteOrderLinesByHeadId,
    insertOrderLineList,
    deleteInboundHeadList
  } from '../../../api/inbound'
  import { Message } from 'element-ui'

  export default {
    components: {
      DatePeriodSelect,
      Pagination,
      KeyWordSearch,
      InboundOrderAdd,
      InboundLineAdd
    },
    data() {
      return {
        loading: false,
        searchFlag: false,
        dialogHeadVisible: false,
        closeFlag: false,
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
        // 应用列表 下拉框使用
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
        // 操作类型列表
        operationTypeList: [
          {
            value: '1',
            label: '登录'
          },
          {
            value: '2',
            label: '退出'
          }
        ],
        form: {},
        dialogTitle: '入库单录入',
        formLine: {},
        addOrderLineData: []
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

      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          findInboundList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, {}).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              this.total = res.data.total
              that.loading = false
              let first = that.tableData[0]
              this.$store.dispatch('inbound/setHeadId', first.headId)
            }
          })
          that.loading = false
        }, 500)
      },
      /**
       * 删除选中行
       * @param item
       */
      deleteHeadOrder(item) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHeadById(item.headId).then(res => {
            if (res.code == 200) {
              this.initData()
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

      /**
       *批量删除
       */
      deleteOrderList() {
        let selectList = this.$refs.table.selection
        let headIdList = [] //初始化headIdList
        for (let t of selectList) {
          headIdList.push(t.headId)
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteInboundHeadList(headIdList).then(res => {
            if (res.code == 200) {
              Message.success('删除成功') // 回头再优化
              this.initData()
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

      handleCurrentChange(val) {
        if (val != null) {
          let id = parseInt(val.headId)
          this.$store.dispatch('inbound/setHeadId', id)
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

      /**
       * 取消录入
       */
      cancelAdd() {
        this.dialogHeadVisible = false
        this.form = {}
        this.dialogTitle = '入库单录入'
      },
      /**
       * 插入或更新
       */
      confirmSubmit() {
        let headId
        if (this.searchFlag) {
          let data = JSON.parse(JSON.stringify(this.form))
          findInboundList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          }, data).then(res => {
            if (res.code == 200) {
              this.tableData = res.data.records
              this.total = res.data.total
              this.loading = false
              if (this.tableData.length > 0) {
                let first = this.tableData[0]
                this.$store.dispatch('inbound/setHeadId', first.headId)
              }
              this.dialogHeadVisible = false
              this.form = {}
            }
          }).catch(e => {
            Message.error(e)
          })
        } else {
          this.$refs.inboundOrderAdd.$refs.inboundOrderForm.validate((valid) => {
            if (valid) {
              saveOrUpdateInboundHead(this.form).then(res => {
                if (res.code == 200) {
                  headId = res.data
                  for (let t of this.addOrderLineData) {
                    t.headId = headId
                  }
                  deleteOrderLinesByHeadId(headId).then(res => {
                    insertOrderLineList(this.addOrderLineData).then(res => {
                      Message.success(res.msg)
                      this.dialogHeadVisible = false
                      this.initData()
                      this.form = {}
                      this.addOrderLineData = []
                    }).catch(e => {
                      Message.error(e)
                    })
                  }).catch(e => {
                    Message.error(e)
                  })
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }

      },

      /**
       * 编辑头信息
       * @param data
       */
      editHeadOrder(data) {
        this.dialogTitle = '入库单编辑'
        this.form = JSON.parse(JSON.stringify(data))
        this.form.docType = parseInt(data.docType)
        this.form.docStatus = parseInt(data.docStatus)
        this.form.sourceDocType = parseInt(data.sourceDocType)
        this.dialogHeadVisible = true
      },
      inboundAdd() {
        this.dialogHeadVisible = true
        this.searchFlag = false
      },
      getFromSon(data) {
        this.addOrderLineData = data
      },
      searchInbound() {
        //查询
        this.dialogHeadVisible = true
        this.searchFlag = true
        this.dialogTitle = '入库单查询'
      }
    }
  }
</script>

<style>
    .el-input {
        width: 220px;
    }

    .el-date-range-picker__editor {
        width: 143px;
    }

    .el-dialog__header {
        /*background-color: #027AFF;*/
        background-color: #011C1D;
        color: #fff;
    }

    .dialog-head {
        height: 20px;
        line-height: 20px;
    }
</style>
