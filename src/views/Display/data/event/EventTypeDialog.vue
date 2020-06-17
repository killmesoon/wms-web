<template>
    <div>
        <el-form :model="form" size="small" label-position="right" ref="eventTypeForm" :inline="isFormInline">

            <el-form-item v-if="flag"  label="类型编码"  :label-width="formLabelWidth">
                <el-input v-model="form.eventTypeCode" placeholder="请定义事件类型编码" autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item v-else  label="类型编码" prop="eventTypeCode" :rules="[{ required: true, message: '请定义事件类型编码', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.eventTypeCode" placeholder="请定义事件类型编码" autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item  v-if="flag" label="类型名称" :label-width="formLabelWidth">
                <el-input v-model="form.eventTypeName" placeholder="请输入事件类型名称" autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item  v-else label="类型名称" prop="eventTypeName" :rules="[{ required: true, message: '请输入事件类型名称', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.eventTypeName" placeholder="请输入事件类型名称" autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item v-if="flag"  label="是否库存变化"  :label-width="formLabelWidth">
                <el-select v-model="form.calculatorFlag" placeholder="是否库存变化">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-else  label="是否库存变化" prop="calculatorFlag"  :rules="[{ required: true, message: '请选择是否库存变化', trigger: 'change' }]" :label-width="formLabelWidth">
                <el-select v-model="form.calculatorFlag" placeholder="是否库存变化">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item  v-if="flag" label="库存变化类型"  :label-width="formLabelWidth">
                <el-select v-model="form.calculatorType" placeholder="请选择库存变化类型">
                    <el-option v-for="item in dicCalculateTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-else  label="库存变化类型" prop="calculatorType" :rules="[{ required: true, message: '请选择库存变化类型', trigger: 'change' }]"  :label-width="formLabelWidth">
                <el-select v-model="form.calculatorType" placeholder="请选择库存变化类型">
                    <el-option v-for="item in dicCalculateTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item v-if="!flag"  label="是否系统录入" prop="isSystem"  :rules="[{ required: true, message: '请选择是否系统录入', trigger: 'change' }]" :label-width="formLabelWidth">
                <el-select v-model="form.isSystem" placeholder="是否系统录入">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item  v-if="flag" label="是否有效"  :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-else  label="是否有效" prop="enableFlag" :rules="[{ required: true, message: '请选择是否有效', trigger: 'change' }]" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item   label="事件描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" placeholder="请输入事件描述" autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item  v-if="!flag" label="事件包信息" :label-width="formLabelWidth">
                <el-input v-model="form.eventPackInfo" placeholder="请输入事件包信息" autocomplete="off">
                </el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'EventTypeDialog',
    props: {
      data: Object,
      flag: Boolean
    },
    data() {
      return {
        form: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        formLabelWidth: '120px'
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList',
        'dicCalculateTypeList'
      ])
    },
    watch: {
      data(current, old) {
        this.form = JSON.parse(JSON.stringify(current))
      },
      flag(current, old) {
        this.flag = current
      }
    }
  }
</script>

<style scoped>

</style>
