<template>
    <div>
        <el-form :model="form" size="small" label-position="right" ref="uomForm" :inline="isFormInline">
            <el-form-item v-if="flag" label="单位编码" :label-width="formLabelWidth">
                <el-input v-model="form.uomCode" placeholder="请定义单位编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="单位编码" prop="uomCode" :rules="[{ required: true, message: '请定义单位编码', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.uomCode" placeholder="请定义单位编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="单位名称" :label-width="formLabelWidth">
                <el-input v-model="form.uomName" placeholder="请输入单位名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="单位名称" prop="uomName" :rules="[{ required: true, message: '请输入单位名称', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.uomName" placeholder="请输入单位名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位类型" :label-width="formLabelWidth">
                <el-select v-model="form.uomType" placeholder="请选择单位类型" @change="uomTypeChange">
                    <el-option v-for="item in dicUomTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否主单位" :label-width="formLabelWidth">
                <el-select v-model="form.primaryFlag" :disabled="primaryFlagDisable" placeholder="请先选择单位类型">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="flag" label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否有效" prop="enableFlag" :rules="[{ required: true, message: '请选择是否有效', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="与主单位换算" :label-width="formLabelWidth">
                <el-input v-model="form.conversionRatio" placeholder="请输入换算系数" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="保留小数位" :label-width="formLabelWidth">
                <el-input v-model="form.decimalNumber" placeholder="请输入保留小数位" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {queryPrimaryUomTypeList} from '../../../../api/data/uom'
  import {Message} from 'element-ui'

  export default {
    name: 'UomDialog',
    props: {
      data: Object,
      flag: Boolean
    },
    data() {
      return {
        form: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        formLabelWidth: '100px',
        primaryFlagDisable: true

      }
    },
    computed: {
      ...mapGetters([
        'dicUomTypeList',
        'dicYNList'
      ])
    },
    watch: {
      data(current, old) {
        this.form = JSON.parse(JSON.stringify(current))
      },
      flag(current, old) {
        this.flag = current
      }
    },
    methods: {
      uomTypeChange(val) {
        queryPrimaryUomTypeList(val).then(res => {
          if (res.code == 200) {
            this.primaryFlagDisable = res.data
            if (this.primaryFlagDisable) {
              // this.form.primaryFlag = '0'
              this.$set(this.form, 'primaryFlag', '0')
            } else {
              this.$set(this.form, 'primaryFlag', '')
            }
          } else {
            Message.error(res.msg)
          }
        }).catch(e => {
          Message.error(e)
        })
      }
    }
  }
</script>

<style scoped>

</style>
