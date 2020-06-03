<template>
    <div>
        <el-form :model="form" size="small" ref="outboundOrderForm"  label-position="right" :inline="isFormInline">
            <el-form-item v-if="flag" label="订单类型" :label-width="formLabelWidth" >
                <el-select v-model="form.docType"  placeholder="请选择订单类型">
                    <el-option v-for="item in dicInboundOrderTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="订单类型" :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择订单类型', trigger: 'change' }]" prop="docType">
                <el-select v-model="form.docType"  placeholder="请选择订单类型">
                    <el-option v-for="item in dicInboundOrderTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号" :label-width="formLabelWidth">
                <el-input v-model="form.docNumber" type="number" placeholder="请输入订单号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="订单状态" :label-width="formLabelWidth" >
                <el-select v-model="form.docStatus" placeholder="请选择订单状态">
                    <el-option v-for="item in dicDocStatusList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="订单状态" :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择订单状态', trigger: 'change' }]" prop="docStatus">
                <el-select v-model="form.docStatus" placeholder="请选择订单状态" >
                    <el-option v-for="item in dicDocStatusList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工厂编码" v-if="flag" :label-width="formLabelWidth">
                <el-select v-model="form.plantId" placeholder="请选择工厂编码">
                    <el-option v-for="item in plantList" :key="item.id" :label="item.plantName"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工厂编码" v-else :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择工厂编码', trigger: 'change' }]" prop="plantId">
                <el-select v-model="form.plantId" placeholder="请选择工厂编码">
                    <el-option v-for="item in plantList" :key="item.id" :label="item.plantName"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源单据类型" :label-width="formLabelWidth">
                <el-select v-model="form.sourceDocType" placeholder="请选择来源单据类型">
                    <el-option v-for="item in dicSourceOrderTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源单据号" :label-width="formLabelWidth">
                <el-input v-model="form.sourceDocNum" type="number" placeholder="请输入来源单据号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="计划日期" :label-width="formLabelWidth">
                <el-date-picker
                        v-model="form.planTime"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.note" placeholder="请输入备注" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'OutboundOrderAdd',
    props:[
      'form',
      'flag'
    ],
    data() {
      return {
        formLabelWidth: '100px',
        isFormInline: true,
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一厂',
            plantCode: 'WGQ1'
          }
        ],
        //时间设置
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    computed: {
      ...mapGetters([
        'dicInboundOrderTypeList',
        'dicDocStatusList',
        'dicSourceOrderTypeList'
      ])
    }
  }
</script>

<style scoped>

</style>
