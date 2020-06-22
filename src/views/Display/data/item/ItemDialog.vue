<template>
    <div>
        <el-form :model="form" size="small" :rules="rules" label-position="right" ref="itemForm" :inline="isFormInline">
            <el-form-item v-if="flag" label="工厂编码" :label-width="formLabelWidth">
                <el-select v-model="form.plantId" placeholder="请选择工厂编码">
                    <el-option v-for="item in plantList" :key="item.id" :label="item.plantName"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="工厂编码" prop="plantId" :rules="[{ required: true, message: '请选择工厂编码', trigger: 'change' }]" :label-width="formLabelWidth">
                <el-select v-model="form.plantId" placeholder="请选择工厂编码">
                    <el-option v-for="item in plantList" :key="item.id" :label="item.plantName"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  v-if="flag" label="物料编码"  :label-width="formLabelWidth">
                <el-input v-model="form.itemCode" placeholder="请定义物料编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else prop="itemCode"  label="物料编码" :label-width="formLabelWidth">
                <el-input v-model="form.itemCode" placeholder="请定义物料编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item  label="物料描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" placeholder="请输入物料描述" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="旧编码" :label-width="formLabelWidth">
                <el-input v-model="form.oldCode" placeholder="请输入旧编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="物料类型" :label-width="formLabelWidth">
                <el-select v-model="form.itemType" placeholder="请选择物料类型">
                    <el-option v-for="item in dicItemTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else prop="itemType" label="物料类型" :rules="[{ required: true, message: '请选择物料类型', trigger: 'change' }]" :label-width="formLabelWidth">
                <el-select v-model="form.itemType" placeholder="请选择物料类型">
                    <el-option v-for="item in dicItemTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="flag"  label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else prop="enableFlag"  :rules="[{ required: true, message: '请选择是否有效', trigger: 'change' }]"  label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag" prop="primaryUom" :rules="[{ required: true, message: '请选择主单位', trigger: 'change' }]" label="主单位" :label-width="formLabelWidth">
                <el-select v-model="form.primaryUom" placeholder="请选择主单位">
                    <el-option v-for="item in uomList" :value="item.uomId" :key="item.uomId"
                               :label="item.uomName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag" label="单重" :label-width="formLabelWidth">
                <el-input v-model="form.unitWeight" placeholder="请输入单重" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item  label="材质" :label-width="formLabelWidth">
                <el-input v-model="form.itemTexture" placeholder="请输入材质" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag"  label="尺寸" :label-width="formLabelWidth">
                <el-input v-model="form.itemSize" placeholder="请输入尺寸" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="规格" :label-width="formLabelWidth">
                <el-input v-model="form.itemSpec" placeholder="请输入规格" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="管理模式" :label-width="formLabelWidth">
                <el-select v-model="form.codeType" placeholder="请选择管理模式">
                    <el-option v-for="item in dicCodeTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else prop="codeType" :rules="[{ required: true, message: '请选择管理模式', trigger: 'change' }]"  label="管理模式" :label-width="formLabelWidth">
                <el-select v-model="form.codeType" placeholder="请选择管理模式">
                    <el-option v-for="item in dicCodeTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag"  label="最小包装数" :label-width="formLabelWidth">
                <el-input v-model="form.minPackageQty" placeholder="请输入最小包装数" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="制单数量" :label-width="formLabelWidth">
                <el-input v-model="form.docCreateQty" placeholder="请输入制单数量" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item  label="是否需质检" :label-width="formLabelWidth">
                <el-select v-model="form.iqcFlag" placeholder="请选择是否需质检">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag"  label="默认接收仓" :label-width="formLabelWidth">
                    <el-select v-model="form.rcvWarehouseCode" placeholder="请选择默认接收仓">
                        <el-option v-for="item in warehouseList" :value="item.warehouseId" :key="item.warehouseId" :label="item.warehouseName">

                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item v-if="!flag" label="默认入库仓" :label-width="formLabelWidth">
                <el-select v-model="form.invWarehouseCode" placeholder="请选择默认入库仓">
                    <el-option v-for="item in warehouseList" :value="item.warehouseId" :key="item.warehouseId" :label="item.warehouseName">

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag"  label="入库规则" :label-width="formLabelWidth">
                <el-input v-model="form.instockRule" placeholder="请定义入库规则" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag"  label="出库规则" :label-width="formLabelWidth">
                <el-input v-model="form.outstockRule" placeholder="请定义出库规则" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="库存安全值" :label-width="formLabelWidth">
                <el-input v-model="form.safetyStockValue" placeholder="请输入库存安全值" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="最大库存" :label-width="formLabelWidth">
                <el-input v-model="form.maxStockQty" placeholder="请输入最大库存" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag"  label="最小库存" :label-width="formLabelWidth">
                <el-input v-model="form.minStockQty" placeholder="请输入最小库存" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="转运批量" :label-width="formLabelWidth">
                <el-input v-model="form.transferLotSize" placeholder="请输入转运批量" autocomplete="off">
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getUomList} from '../../../../api/data/uom'
    import {getWareHouseList} from '../../../../api/model/warehouse'
    import {checkItemCodeExits} from '../../../../api/data/data'
    import { mapGetters } from 'vuex'
    import {Message} from 'element-ui'
  export default {
    name: 'ItemDialog',
    props: {
      data: Object,
      flag: Boolean,
      editFlag: Boolean
    },
    created() {
      getUomList({
        current: 1,
        size:-1
      },{}).then(res => {
        if (res.code == 200) {
          let list = JSON.parse(JSON.stringify(res.data.records))
          for (let t of list) {
            if (t.primaryFlag) {
              this.uomList.push(t)
            }
          }
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
      getWareHouseList({
        current:1 ,
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
    },
    data() {
      var checkItemCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请定义供应商编码'))
        }
        if (this.editFlag) {
          callback()
        } else {
          setTimeout(() => {
            //校验物料编码是否存在
            checkItemCodeExits({
              supplierCode: value
            }).then(res => {
              if (res.data) {
                //存在相同
                callback()
              } else {
                return callback(new Error('该供应商编码已存在'))
              }
            }).catch(e => {
              Message.error(e)
            })
          }, 500)
        }
      }
      return {
        form: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        formLabelWidth: '100px',
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一厂',
            plantCode: 'WGQ1'
          }
        ],
        uomList: [],
        warehouseList: [],
        rules:{
          itemCode: [
            { required: true, validator: checkItemCode, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'dicItemTypeList',
        'dicYNList',
        'dicCodeTypeList'
      ])
    },
    watch: {
      data: {
        immediate: true,
        handler: function(current, old) {
          if (JSON.stringify(current) == '{}') {
            this.form = JSON.parse(JSON.stringify(current))
          } else {
            this.form = JSON.parse(JSON.stringify(current))
            this.form.primaryUom = parseInt(this.form.primaryUom)
            this.form.rcvWarehouseCode = parseInt(this.form.rcvWarehouseCode)
            this.form.invWarehouseCode = parseInt(this.form.invWarehouseCode)
            this.form.itemType = parseInt(this.form.itemType)
            this.form.enableFlag = this.form.enableFlag ? '1' : '0'
            this.form.iqcFlag = this.form.iqcFlag ? '1' : '0'
            this.form.codeType = parseInt(this.form.codeType)
          }
        }
      },
      flag(current, old) {
        this.flag = current
      },
      editFlag(current, old) {
        this.editFlag = current
      }
    }
  }
</script>

<style scoped>

</style>
