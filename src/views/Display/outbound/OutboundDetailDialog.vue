<template>
    <div>
        <el-button type="primary" size="mini"
                   icon="el-icon-plus" @click="detailLineAdd">录入
        </el-button>
        <el-button type="danger" size="mini"
                   icon="el-icon-delete" @click="deleteLineSelection">删除
        </el-button>
        <el-table :data="addOrderLineData" stripe ref="multipleLineTable">
            <el-table-column
                    type="selection"
                    width="30">
            </el-table-column>
            <el-table-column prop="advBarcode" label="建议条码">
            </el-table-column>
            <el-table-column prop="itemCode" label="物料编码">
            </el-table-column>
            <el-table-column prop="itemDesc" label="物料描述">
            </el-table-column>
            <el-table-column prop="advWarehouseName" label="建议仓库">
            </el-table-column>
            <el-table-column prop="advLocatorName" label="建议货位">
            </el-table-column>
            <el-table-column prop="advLotCode" label="建议批次">
            </el-table-column>
            <el-table-column prop="advQuantity" label="建议数量">
            </el-table-column>
            <el-table-column prop="advBarcode" label="建议条码">
            </el-table-column>
            <el-table-column prop="excuWarehouseName" label="执行仓库">
            </el-table-column>
            <el-table-column prop="excuLocatorName" label="执行货位">
            </el-table-column>
            <el-table-column prop="excuLotCode" label="执行批次">
            </el-table-column>
            <el-table-column prop="excuQuantity" label="执行数量">
            </el-table-column>
            <el-table-column prop="execBarcode" label="执行条码">
            </el-table-column>
            <el-table-column prop="note" label="备注">
            </el-table-column>
        </el-table>
        <el-dialog :append-to-body="applyToBody" :visible.sync="dialogDetailVisible" width="55%"
                   ref="asnDetailLineDialog"
                   @close="resetAll"
                   :close-on-click-modal="isClose">
            <div slot="title" class="dialog-head"><span>明细信息录入</span></div>
            <el-form :model="formLine" size="small" label-position="right" ref="inboundDetailLineForm"  :inline="isFormInline">
                <el-form-item label="建议条码" prop="advBarcode" :rules="[{ required: true, message: '请输入建议条码', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.advBarcode" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="物料编码"  :label-width="formLabelWidth" >
                    <el-input v-model="formLine.itemCode" :disabled="disable" autocomplete="off" />
                </el-form-item>
                <el-form-item label="物料描述" :label-width="formLabelWidth">
                    <el-input v-model="formLine.itemDesc" :disabled="disable" autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="建议仓库" prop="warehouseItem" :rules="[{ required: true, message: '请输入船号', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-select value-key="warehouseId" v-model="formLine.warehouseItem" @change="warehouseChange">
                        <el-option v-for="item in warehouseList" :label="item.warehouseName" :value="item" :key="item.warehouseId">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="建议货位"   :label-width="formLabelWidth">
                    <el-select value-key="locatorId" v-model="formLine.locatorItem" @change="locatorChange">
                        <el-option  v-for="item in locatorList" :key="item.locatorId" :label="item.locatorName"  :value="item">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="建议批次" :label-width="formLabelWidth">
                    <el-input v-model="formLine.advLotCode"  autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="建议数量" :label-width="formLabelWidth">
                    <el-input v-model="formLine.advQuantity"  autocomplete="off">
                    </el-input>
                </el-form-item>


                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formLine.note" placeholder="请输入备注" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDetailVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSingleLine">确 定</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
  import { getWareHouseList } from '../../../api/model/warehouse'
  import { Message } from 'element-ui'
  import { queryLocatorList } from '../../../api/model/locator'

  export default {
    name: 'OutboundDetailDialog',
    props: {
      data: Array,
      line: Object
    },
    created() {
      getWareHouseList({
        current: 1,
        size: -1
      },{}).then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data.records
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
      queryLocatorList({
        current: 1,
        size: -1
      },{}).then(res => {
        if (res.code == 200) {
          this.locatorList = res.data.records
          console.log(this.locatorList)
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
    },
    data() {
      return {
        addOrderLineData: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        isClose: false,
        applyToBody: true,
        formLine: {},
        formLabelWidth: '100px',
        uomList: [],
        itemList: [],
        dialogDetailVisible: false,
        lineItem: this.line,
        disable: true,
        warehouseList: [],
        locatorList: []
      }
    },
    methods: {
      detailLineAdd() {
        this.dialogDetailVisible = true
        this.$set(this.formLine, 'itemCode', this.lineItem.itemCode)
        this.$set(this.formLine, 'itemDesc', this.lineItem.description)
      },
      addSingleLine() {
        let data = JSON.parse(JSON.stringify(this.formLine))
        data.lineId = this.lineItem.lineId
        data.headId = this.lineItem.headId
        this.$refs.inboundDetailLineForm.validate((valid) => {
          if (valid) {
            this.addOrderLineData.push(data)
            this.dialogDetailVisible = false
            this.formLine = {}
            this.$emit('event1', JSON.parse(JSON.stringify(this.addOrderLineData)))
          } else {
            return false
          }
        })
      },
      deleteLineSelection() {

      },
      warehouseChange(e) {
        this.$set(this.formLine, 'advWarehouseId', e.warehouseId)
        this.$set(this.formLine, 'advWarehouseName', e.warehouseName)
      },
      locatorChange(e) {
        this.$set(this.formLine, 'advLocatorId', e.locatorId)
        this.$set(this.formLine, 'advLocatorName', e.locatorName)
      },
      resetAll() {
        this.$refs.inboundDetailLineForm.resetFields()
      }
    },
    watch: {
      data(current, old) {
        this.addOrderLineData = JSON.parse(JSON.stringify(current))
      },
      line(current, old) {
        this.lineItem = current
      }
    }
  }
</script>

<style scoped>

</style>
