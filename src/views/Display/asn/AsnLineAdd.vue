<template>
    <div class="inbound-header-form">
        <el-button type="primary" size="mini"
                   icon="el-icon-plus" @click="dialogLineOrderVisible = true">录入
        </el-button>
        <el-button type="danger" size="mini"
                   icon="el-icon-delete" @click="deleteLineSelection">删除
        </el-button>
        <el-table :data="addOrderLineData" stripe ref="multipleLineTable">
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
            <el-table-column width="120px" prop="sourcePoDic" label="来源单据类型">
            </el-table-column>
<!--            <el-table-column prop="sourceDocNum" label="单据号">-->
<!--            </el-table-column>-->
            <el-table-column prop="sourceLine" label="单据行号">
            </el-table-column>
            <el-table-column prop="note" label="备注">
            </el-table-column>

        </el-table>
        <el-dialog :append-to-body="applyToBody" :visible.sync="dialogLineOrderVisible" width="55%"
                   ref="inboundLineForm"
                   @close="resetAll"
                   :close-on-click-modal="isClose">
            <div slot="title" class="dialog-head"><span>行信息录入</span></div>
            <el-form :model="formLine" size="small" label-position="right" ref="inboundOrderLineForm"  :inline="isFormInline">
                <!--                <el-form-item label="行号" :label-width="formLabelWidth">-->
                <!--                    <el-input v-model="formLine.lineNum" autocomplete="off" placeholder="请输入行号">-->
                <!--                    </el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="物料编码" prop="itemCode" :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择物料编码', trigger: 'change' }]">
                    <el-select v-model="formLine.itemCode" placeholder="请定义物料编码" value-key="itemId" filterable
                               @change="itemCodeChange"
                    >
                        <el-option v-for="item in itemList" :key="item.itemId" :label="item.itemCode" :value="item">
                        </el-option>

                    </el-select>
                    <!--                    <el-input v-model="formLine.itemCode" autocomplete="off" :disabled="disable"  v-popover:proFlag></el-input>-->
                </el-form-item>
                <el-form-item label="物料描述" :label-width="formLabelWidth">
                    <el-input v-model="formLine.description" :disabled="disable" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="仓库编码" prop="warehouseCode" :rules="[{ required: true, message: '请选择', trigger: 'change' }]" :label-width="formLabelWidth">
                    <el-select v-model="formLine.warehouseCode"  placeholder="请定义仓库编码" filterable value-key="warehouseId"
                               @change="wareHouseCodeChange">
                        <el-option v-for="item in wareHouseList" :key="item.warehouseId" :label="item.warehouseCode"
                                   :value="item">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                    <el-input v-model="formLine.warehouseName" :disabled="disable" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="来源单据类型"  :label-width="formLabelWidth">
                    <el-select v-model="formLine.sourceDocTypeItem" value-key="dicId" @change="sourceDocTypeChange" placeholder="请选择来源单据类型">
                        <el-option v-for="item in dicSourceOrderTypeList" :key="item.dicCode" :label="item.dicName"
                                   :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位" prop="uom" :rules="[{ required: true, message: '请选择单位', trigger: 'change' }]" :label-width="formLabelWidth">
                    <el-select v-model="formLine.uom" filterable placeholder="请选择单位">
                        <el-option v-for="item in uomList" :key="item.uomId" :label="item.uomCode"
                                   :value="item.uomCode">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划数量" prop="planQty" :rules="[{ required: true, message: '请输入计划数量', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input type="number"  v-model="formLine.planQty"  autocomplete="off" placeholder="请输入计划数量"></el-input>
                </el-form-item>
                <el-form-item label="来源单据号" :label-width="formLabelWidth">
                    <el-input type="number"  v-model="formLine.sourceLine" placeholder="请输入来源单据号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formLine.note" placeholder="请输入备注" autocomplete="off"></el-input>
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
  import { getItemList } from '../../../api/data/data'
  import { Message } from 'element-ui'
  import { getWareHouseList } from '../../../api/model/warehouse'
  import { getUomList } from '../../../api/data/uom'
  import { mapGetters } from 'vuex'

  export default {
    name: 'AsnLineAdd',
    props: {
      data: Array
    },
    created() {
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
    data() {
      return {
        testData: 'aaa',
        disable: true,
        dialogLineOrderVisible: false,
        isFormInline: true,
        isClose: false,
        formLabelWidth: '100px',
        itemList: [],
        wareHouseList: [],
        uomList: [],
        applyToBody: true,
        formLine: {},
        addOrderLineData : this.data,
        gridData: []
      }
    },
    methods :{
      handleCurrentChange(val) {
        this.$set(this.formLine, 'description',val.description)
        this.$set(this.formLine, 'itemCode', val.itemCode)
        this.$set(this.formLine, 'itemId', val.itemId)
        this.$refs.proFlag.doClose()
      },
      itemCodeChange(e) {
        this.formLine.itemCode = e.itemCode
        this.formLine.description = e.description
        this.formLine.itemId = e.itemId
        console.log(this.formLine)
      },
      wareHouseCodeChange(e) {
        this.formLine.warehouseCode = e.warehouseCode
        this.formLine.warehouseName = e.warehouseName
        this.formLine.warehouseId = e.warehouseId
      },
      addSingleLine() {
        this.formLine.lineNum = (this.addOrderLineData.length + 1) * 10
        //查一下行总数
        let data = JSON.parse(JSON.stringify(this.formLine))
        this.$refs.inboundOrderLineForm.validate((valid) => {
          if (valid) {
            this.addOrderLineData.push(data)
            this.dialogLineOrderVisible = false
            this.formLine = {}
            this.$emit('event1', JSON.parse(JSON.stringify(this.addOrderLineData)))
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelAdd() {
        this.dialogLineOrderVisible = false
        this.formLine = {}
      },
      deleteLineSelection() {
        //批量删除行信息
        let selectList = this.$refs.multipleLineTable.selection
        for (let t of selectList) {
          this.addOrderLineData.splice(this.addOrderLineData.indexOf(t), 1)
        }
      },
      sourceDocTypeChange(e) {
        this.formLine.sourcePo = e.dicId
        this.formLine.sourcePoDic = e.dicName
      },
      resetAll() {
        this.$refs.inboundOrderLineForm.resetFields()
        this.formLine = {}
      }
    },
    computed: {
      ...mapGetters([
        'dicSourceOrderTypeList'
      ])
    },
    watch: {
      data(current, old) {
        this.addOrderLineData = current
      }
    }
  }
</script>

<style scoped>

</style>
