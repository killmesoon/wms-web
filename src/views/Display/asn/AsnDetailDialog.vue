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
            <el-table-column prop="dsequenceNum" label="钢板号">
            </el-table-column>
            <el-table-column prop="itemCode" label="物料编码">
            </el-table-column>
            <el-table-column prop="description" label="物料描述">
            </el-table-column>
            <el-table-column prop="shipNumber" label="船号">
            </el-table-column>
            <el-table-column prop="sectionNum" label="分段号">
            </el-table-column>
            <el-table-column prop="ccs" label="船级">
            </el-table-column>
            <el-table-column prop="itemTexture" label="材质">
            </el-table-column>
            <el-table-column width="120px" prop="weight" label="重量">
            </el-table-column>
            <el-table-column prop="weightUom" label="重量单位">
            </el-table-column>
            <el-table-column prop="size" label="规格">
            </el-table-column>
            <el-table-column prop="thickness" label="厚度">
            </el-table-column>
            <el-table-column prop="sizeUom" label="尺寸单位">
            </el-table-column>
            <el-table-column prop="heatNumber" label="炉号">
            </el-table-column>
            <el-table-column prop="qcReport" label="质保书号">
            </el-table-column>
            <el-table-column prop="note" label="备注">
            </el-table-column>
        </el-table>
        <el-dialog :append-to-body="applyToBody" :visible.sync="dialogDetailVisible" width="55%"
                   ref="asnDetailLineDialog"
                   @close="resetAll"
                   :close-on-click-modal="isClose">
            <div slot="title" class="dialog-head"><span>明细信息录入</span></div>
            <el-form :model="formLine" size="small" label-position="right" ref="asnDetailLineForm"  :inline="isFormInline">
                <!--                <el-form-item label="行号" :label-width="formLabelWidth">-->
                <!--                    <el-input v-model="formLine.lineNum" autocomplete="off" placeholder="请输入行号">-->
                <!--                    </el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="钢板号" prop="dsequenceNum" :rules="[{ required: true, message: '请输入钢板号', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.dsequenceNum" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="物料编码"  :label-width="formLabelWidth" >
<!--                    <el-select v-model="formLine.itemCode" placeholder="请定义物料编码" value-key="itemId" filterable-->
<!--                               @change="itemCodeChange"-->
<!--                    >-->
<!--                        <el-option v-for="item in itemList" :key="item.itemId" :label="item.itemCode" :value="item">-->
<!--                        </el-option>-->

<!--                    </el-select>-->
                    <el-input v-model="formLine.itemCode" :disabled="disable" autocomplete="off" />
                </el-form-item>
                <el-form-item label="物料描述" :label-width="formLabelWidth">
                    <el-input v-model="formLine.description" :disabled="disable" autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="船号" prop="shipNumber" :rules="[{ required: true, message: '请输入船号', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.shipNumber"  autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="分段号" prop="sectionNum" :rules="[{ required: true, message: '请输入分段号', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.sectionNum"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="船级" :label-width="formLabelWidth">
                    <el-input v-model="formLine.ccs"  autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="材质" prop="itemTexture" :rules="[{ required: true, message: '请输入材质', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.itemTexture"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="重量" prop="weight" :rules="[{ required: true, message: '请输入重量', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.weight"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="重量单位" prop="weightUom" :rules="[{ required: true, message: '请选择重量单位', trigger: 'change' }]" :label-width="formLabelWidth">
                    <el-select v-model="formLine.weightUom" filterable placeholder="请选择重量单位">
                        <el-option v-for="item in uomList" :key="item.uomId" :label="item.uomName"
                                   :value="item.uomName">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="规格" prop="size" :rules="[{ required: true, message: '请输入规格', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.size"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="长度" prop="length" :rules="[{ required: true, message: '请输入长度', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.length"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="宽度" prop="width" :rules="[{ required: true, message: '请输入宽度', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.width"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="厚度" prop="thickness" :rules="[{ required: true, message: '请输入厚度', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.thickness"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="尺寸单位" :label-width="formLabelWidth">
                    <el-select v-model="formLine.sizeUom" filterable placeholder="请选择尺寸单位">
                        <el-option v-for="item in uomList" :key="item.uomId" :label="item.uomName"
                                   :value="item.uomName">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="炉号" prop="heatNumber" :rules="[{ required: true, message: '请输入炉号', trigger: 'blur' }]" :label-width="formLabelWidth">
                    <el-input v-model="formLine.heatNumber"  autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="质保书号" :label-width="formLabelWidth">
                    <el-input v-model="formLine.qcReport"  autocomplete="off">
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
  import { getItemList } from '../../../api/data/data'
  import { Message } from 'element-ui'
  import { getUomList } from '../../../api/data/uom'

  export default {
    name: 'AsnDetailDialog',
    props: {
      data: Array,
      line: Object
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
        dialogDetailVisible: false,
        addOrderLineData: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        isClose: false,
        applyToBody: true,
        formLine: {},
        formLabelWidth: '100px',
        uomList: [],
        itemList: [],
        disable: true,
        lineItem: this.line
      }
    },
    methods: {
      itemCodeChange(e) {
        this.formLine.itemCode = e.itemCode
        this.formLine.description = e.description
        this.formLine.itemId = e.itemId
      },
      addSingleLine() {
        let data = JSON.parse(JSON.stringify(this.formLine))
        data.lineId = this.lineItem.lineId
        data.headId = this.lineItem.headId
        data.itemId = this.lineItem.itemId
        this.$refs.asnDetailLineForm.validate((valid) => {
          if (valid) {
            this.addOrderLineData.push(data)
            this.dialogDetailVisible = false
            this.formLine = {}
            this.$emit('event1', JSON.parse(JSON.stringify(this.addOrderLineData)))
          }
        })
      },
      deleteLineSelection() {
        //批量删除行信息
        let selectList = this.$refs.multipleLineTable.selection
        for (let t of selectList) {
          this.addOrderLineData.splice(this.addOrderLineData.indexOf(t), 1)
        }
      },
      resetAll() {
        this.$refs.asnDetailLineForm.resetFields()
        this.formLine = {}
      },
      detailLineAdd() {
        this.dialogDetailVisible = true
        this.$set(this.formLine, 'itemCode', this.lineItem.itemCode)
        this.$set(this.formLine, 'description', this.lineItem.description)
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
