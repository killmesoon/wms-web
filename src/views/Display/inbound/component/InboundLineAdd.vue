<template>
    <div class="inbound-header-form">
        <el-button type="primary" size="small"
                   icon="el-icon-plus" @click="dialogLineOrderVisible = true">录入
        </el-button>
        <el-button type="danger" size="small"
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
            <el-table-column prop="sourceDocType" label="来源单据类型">
            </el-table-column>
            <el-table-column prop="sourceDocNum" label="单据号">
            </el-table-column>
            <el-table-column prop="sourceLineNum" label="单据行号">
            </el-table-column>
            <el-table-column prop="note" label="备注">
            </el-table-column>

        </el-table>
        <el-dialog :append-to-body="applyToBody" :visible.sync="dialogLineOrderVisible" width="55%"
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
  import { getItemList } from '../../../../api/data/data'
  import { getWareHouseList } from '../../../../api/model/warehouse'
  import { getUomList } from '../../../../api/data/uom'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'

  export default {
    name: 'InboundLineAdd',
    data() {
      return {
        dialogLineOrderVisible: false,
        isFormInline: true,
        isClose: false,
        formLabelWidth: '100px',
        itemList: [],
        wareHouseList: [],
        uomList: [],
        applyToBody: true,
        formLine: {},
        addOrderLineData :[]
      }
    },
    created() {
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
    methods: {
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
      addSingleLine() {
        this.addOrderLineData.push(this.formLine)
        this.dialogLineOrderVisible = false
        this.formLine = {}
        this.$emit('event1', JSON.parse(JSON.stringify(this.addOrderLineData)))
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
      }
    },
    computed: {
      ...mapGetters([
        'dicSourceOrderTypeList'
      ])
    }
  }
</script>

<style scoped>
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
