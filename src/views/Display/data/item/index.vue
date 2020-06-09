<template>
<div class="white-body-view">
    <el-button type="danger"  size="mini" icon="el-icon-delete" @click="deleteOrderList"> 批量删除</el-button>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="supplierAdd"> 录入</el-button>
    <el-button type="primary" size="mini" icon="el-icon-search" @click="searchData"> 查询</el-button>
    <div>
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
                <el-table-column prop="plantId" label="工厂编码">
                </el-table-column>
                <el-table-column prop="itemCode" label="物料编码">
                </el-table-column>
                <el-table-column prop="oldCode" label="旧编码">
                </el-table-column>
                <el-table-column prop="itemTypeDic" label="物料类型">
                </el-table-column>
                <el-table-column align="center" prop="enableFlag" label="是否有效">
                    <template slot-scope="scope">
                        <span>{{scope.row.enableFlag ? 'Y' : 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="primaryUomDic" label="主单位">
                </el-table-column>
                <el-table-column prop="unitWeight" label="单重">
                </el-table-column>
                <el-table-column prop="itemTexture" label="材质">
                </el-table-column>
                <el-table-column prop="itemSize" label="尺寸">
                </el-table-column>
                <el-table-column prop="itemSpec" label="规格">
                </el-table-column>
                <el-table-column prop="codeType" label="管理模式">
                </el-table-column>
                <el-table-column prop="minPackageQty" width="100px" label="最小包装数">
                </el-table-column>
                <el-table-column prop="docCreateQty" label="制单数量">
                </el-table-column>
                <el-table-column align="center" prop="iqcFlag" width="100px" label="是否需质检">
                    <template slot-scope="scope">
                        <span>{{scope.row.enableFlag ? 'Y' : 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="receiveWarehouse" width="100px" label="默认接收仓">
                </el-table-column>
                <el-table-column prop="inboundWarehouse" width="100px" label="默认入库仓">
                </el-table-column>
                <el-table-column prop="instockRule" label="入库规则">
                </el-table-column>
                <el-table-column prop="outstockRule" label="出库规则">
                </el-table-column>
                <el-table-column prop="safetyStockValue" label="安全库存">
                </el-table-column>
                <el-table-column prop="maxStockQty" label="最大库存">
                </el-table-column>
                <el-table-column prop="minStockQty" label="最小库存">
                </el-table-column>
                <el-table-column prop="transferLotSize" label="转运批量">
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
        <el-dialog :visible.sync="dialogVisible" width="50%" :title="dialogTitle" :close-on-click-modal="closeFlag" @close="resetAll">
            <item-dialog :data="form" :flag="searchFlag" ref="itemDialog"></item-dialog>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { getItemList , saveOrUpdateItem} from '../../../../api/data/data'
  import {Message} from 'element-ui'
  import ItemDialog from './ItemDialog'

  export default {
    name: 'index',
    components: {
      ItemDialog,
      Pagination
    },
    created() {
      this.initData()
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
        dialogTitle: '新增物料',
        form: {},
        tableHeight: 500,
        searchFlag: false,
      }
    },
    methods: {
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          getItemList({
            current: this.listQuery.page,
            size: this.listQuery.limit
          },{}).then(res => {
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
      searchData() {
        this.dialogVisible = true
        this.form = {}
        this.searchFlag = true
      },
      confirmSubmit() {
        let t = JSON.parse(JSON.stringify(this.$refs.itemDialog.form))
        this.form = t
        if (this.form.enableFlag) {
          this.form.enableFlag = parseInt(this.form.enableFlag)
        }
        if (this.form.iqcFlag) {
          this.form.iqcFlag = parseInt(this.form.iqcFlag)
        }
        if (this.searchFlag) {
          getItemList({
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
          this.$refs.itemDialog.$refs.itemForm.validate((valid) => {
            if (valid) {
              saveOrUpdateItem(this.form).then(res => {
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
        }
      },
      editSupplier(data) {
        this.searchFlag = false
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(data))
        this.form.primaryUom = parseInt(this.form.primaryUom)
        this.form.rcvWarehouseCode = parseInt(this.form.rcvWarehouseCode)
        this.form.invWarehouseCode = parseInt(this.form.invWarehouseCode)
        this.form.itemType = parseInt(this.form.itemType)
        this.form.enableFlag = this.form.enableFlag ? '1' : '0'
        this.form.iqcFlag = this.form.iqcFlag ? '1' : '0'
        this.dialogTitle = '编辑物料'
      },
      deleteOrderList() {

      },
      deleteSupplier(data) {

      },
      resetAll() {
        if (this.searchFlag) {
          this.$refs.itemDialog.$refs.itemForm.resetFields()
        }
        this.form = {}
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
