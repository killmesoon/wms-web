<template>
    <div>
        <el-form :model="form" :rules="rules" size="small" ref="warehouseForm" label-position="right"
                 :inline="isFormInline">
            <el-form-item v-if="flag" label="工厂编码" :label-width="formLabelWidth">
                <el-select v-model="form.plantCode" placeholder="请选择工厂编码" @change="plantChange" value-key="plantId">
                    <el-option
                            v-for="item in plantList"
                            :key="item.plantId"
                            :label="item.plantCode"
                            :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item v-else label="工厂编码" :label-width="formLabelWidth" prop="plantCode"
                          :rules="[{ required: true, message: '请选择工厂编码', trigger: 'change' }]">
                <el-select v-model="form.plantCode" placeholder="请选择工厂编码" @change="plantChange" value-key="plantId">
                    <el-option
                            v-for="item in plantList"
                            :key="item.plantId"
                            :label="item.plantCode"
                            :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item v-if="flag" label="仓库类型" :label-width="formLabelWidth">
                <el-select v-model="form.warehouseType" placeholder="请选择仓库类型">
                    <el-option v-for="item in dicWarehouseTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-else label="仓库类型" :label-width="formLabelWidth" prop="warehouseType"
                          :rules="[{ required: true, message: '请选择仓库类型', trigger: 'change' }]">
                <el-select v-model="form.warehouseType" placeholder="请选择仓库类型">
                    <el-option v-for="item in dicWarehouseTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工厂名称" :label-width="formLabelWidth">
                <el-input v-model="form.plantName" :disabled="disable" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="允许负库存" :label-width="formLabelWidth">
                <el-select v-model="form.negativeFlag" placeholder="是否允许负库存">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="允许负库存" :label-width="formLabelWidth" prop="negativeFlag"
                          :rules="[{ required: true, message: '请选择是否允许负库存', trigger: 'change' }]">
                <el-select v-model="form.negativeFlag" placeholder="是否允许负库存">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库编码" :label-width="formLabelWidth" v-if="flag">
                <el-input v-model="form.warehouseCode" placeholder="请定义仓库编码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="仓库编码" prop="warehouseCode" :label-width="formLabelWidth"
            >
                <el-input v-model="form.warehouseCode" placeholder="请定义仓库编码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否盘点" :label-width="formLabelWidth" v-if="flag">
                <el-select v-model="form.panrangeFlag" placeholder="请选择是否盘点">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否盘点" :label-width="formLabelWidth" prop="panrangeFlag"
                          :rules="[{ required: true, message: '请选择是否参与盘点', trigger: 'change' }]">
                <el-select v-model="form.panrangeFlag" placeholder="请选择是否盘点">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="flag" label="仓库名称" :label-width="formLabelWidth" prop="warehouseName">
                <el-input v-model="form.warehouseName" placeholder="请输入仓库名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="仓库名称" :label-width="formLabelWidth" prop="warehouseName"
                          :rules="[{ required: true, message: '请输入仓库名称', trigger: 'blur' }]">
                <el-input v-model="form.warehouseName" placeholder="请输入仓库名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否有效" :label-width="formLabelWidth" prop="enableFlag"
                          :rules="[{ required: true, message: '请选择是否有效', trigger: 'change' }]">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="flag" label="仓库简称" :label-width="formLabelWidth">
                <el-input v-model="form.shortName" placeholder="请输入仓库简称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="仓库简称" :label-width="formLabelWidth" prop="shortName"
                          :rules="[{ required: true, message: '请输入仓库简称', trigger: 'blur' }]">
                <el-input v-model="form.shortName" placeholder="请输入仓库简称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="仓库描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" placeholder="请输入仓库描述" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { checkWarehouseCodeExits } from '../../../../api/model/warehouse'
  import { Message } from 'element-ui'

  export default {
    name: 'WarehouseDialog',
    props: {
      data: Object,
      flag: Boolean,
      editFlag: Boolean
    },
    data() {
      var checkWarehouseCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请定义仓库编码'))
        }
        if (this.editFlag) {
          callback()
        } else {
          setTimeout(() => {
            //校验物料编码是否存在
            checkWarehouseCodeExits({
              warehouseCode: value
            }).then(res => {
              if (res.data) {
                //存在相同
                callback()
              } else {
                return callback(new Error('该仓库编码已存在'))
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
        disable: true,
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一厂',
            plantCode: 'WGQ1'
          }
        ],
        rules: {
          warehouseCode: [
            { required: true, validator: checkWarehouseCode, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      plantChange(item) {
        this.form.plantName = item.plantName
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList',
        'dicWarehouseTypeList'
      ])
    },
    watch: {
      data: {
        immediate: true,
        handler: function(current, old) {
          this.form = JSON.parse(JSON.stringify(current))
          if (this.form.enableFlag != null) {
            this.form.enableFlag = this.form.enableFlag ? '1' : '0'
          }
          if (this.form.negativeFlag != null) {
            this.form.negativeFlag = this.form.negativeFlag ? '1' : '0'
          }
          if (this.form.panrangeFlag != null) {
            this.form.panrangeFlag = this.form.panrangeFlag ? '1' : '0'
          }
          if (this.form.warehouseType != null) {
            this.form.warehouseType = parseInt(this.form.warehouseType)
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
