<template>
    <div>
        <el-form :model="form" size="small" label-position="right" :rules="rules" ref="supplierForm" :inline="isFormInline">
            <el-form-item v-if="flag" label="供应商编码" :label-width="formLabelWidth">
                <el-input v-model="form.supplierCode" placeholder="请定义供应商编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="供应商编码" prop="supplierCode" :label-width="formLabelWidth" >
                <el-input v-model="form.supplierCode" placeholder="请定义供应商编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="供应商名称" :label-width="formLabelWidth">
                <el-input v-model="form.supplierName" placeholder="请输入供应商名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="供应商名称" prop="supplierName"  :rules="[{ required: true, message: '请输入供应商名称', trigger: 'blur' }]"  :label-width="formLabelWidth">
                <el-input v-model="form.supplierName" placeholder="请输入供应商名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="供应商简称" :label-width="formLabelWidth">
                <el-input v-model="form.shortName" placeholder="请输入供应商简称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="供应商简称" prop="shortName" :rules="[{ required: true, message: '请输入供应商简称', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.shortName" placeholder="请输入供应商简称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商类型" :label-width="formLabelWidth">
                <el-select v-model="form.supplierType" placeholder="请选择供应商类型">
                    <el-option v-for="item in dicSupplierTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="flag" label="供应商状态" :label-width="formLabelWidth">
                <el-select v-model="form.supplierStatus" placeholder="请选择供应商状态">
                    <el-option v-for="item in dicSupplierStatusList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="供应商状态" prop="supplierStatus" :rules="[{ required: true, message: '请选择供应商状态', trigger: 'change' }]"  :label-width="formLabelWidth">
                <el-select v-model="form.supplierStatus" placeholder="请选择供应商状态">
                    <el-option v-for="item in dicSupplierStatusList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag" label="供应商地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" placeholder="请输入供应商地址" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="联系人" :label-width="formLabelWidth">
                <el-input  v-model="form.contact" placeholder="请输入联系人" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="联系电话" :label-width="formLabelWidth">
                <el-input  v-model="form.phone" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.mail" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.note" autocomplete="off" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { checkSupplierExits} from '../../../../api/data/supplier'
  import { Message } from 'element-ui'

  export default {
    name: 'SupplierDialog',
    props: {
      data: Object,
      flag: Boolean,
      editFlag: Boolean
    },
    data() {
      var checkSupplierCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请定义供应商编码'))
        }
        if (this.editFlag) {
          callback()
        } else {
          setTimeout(() => {
            //校验物料编码是否存在
            checkSupplierExits({
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
        rules: {
          supplierCode: [
            { required: true, validator: checkSupplierCode, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'dicSupplierTypeList',
        'dicSupplierStatusList'
      ])
    },
    watch: {
      data(current, old) {
        this.form = JSON.parse(JSON.stringify(current))
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
