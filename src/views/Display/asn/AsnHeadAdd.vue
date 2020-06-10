<template>
    <div>
        <el-form :model="form" size="small" ref="asnOrderForm"  label-position="right" :inline="isFormInline">
            <el-form-item v-if="flag" label="订单类型" :label-width="formLabelWidth" >
                <el-select v-model="form.asnType"  placeholder="请选择订单类型">
                    <el-option v-for="item in dicAsnOrderTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="订单类型" :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择订单类型', trigger: 'change' }]" prop="asnType">
                <el-select v-model="form.asnType"  placeholder="请选择订单类型">
                    <el-option v-for="item in dicAsnOrderTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号" :label-width="formLabelWidth">
                <el-input v-model.number="form.asnNumber"  placeholder="请输入订单号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="订单状态" :label-width="formLabelWidth" >
                <el-select v-model="form.asnStatus" placeholder="请选择订单状态">
                    <el-option v-for="item in dicDocStatusList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="订单状态" :label-width="formLabelWidth" :rules="[{ required: true, message: '请选择订单状态', trigger: 'change' }]" prop="asnStatus">
                <el-select v-model="form.asnStatus" placeholder="请选择订单状态" >
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
            <el-form-item v-if="!flag" label="来源单据类型" :label-width="formLabelWidth">
                <el-select v-model="form.sourceDocType" placeholder="请选择来源单据类型">
                    <el-option v-for="item in dicSourceOrderTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源单据号" :label-width="formLabelWidth">
                <el-input v-model="form.sourceDocNum" type="number" placeholder="请输入来源单据号" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  label="供应商编码" :label-width="formLabelWidth">
                <el-select v-model="form.supplierCode" value-key="supplierId" @change="changeSupplier" placeholder="请选择供应商编码">
                    <el-option v-for="item in supplierList" :key="item.supplierId" :label="item.supplierCode"
                               :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag" label="供应商名称" :label-width="formLabelWidth">
                <el-input v-model="form.supplierName" :disabled="true"  autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="!flag" label="送货单位" :label-width="formLabelWidth">
                <el-input v-model="form.dCompanyName"  placeholder="请输入送货单位" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="!flag" label="送货人姓名" :label-width="formLabelWidth">
                <el-input v-model="form.dUserName"  placeholder="请输入送货人姓名" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="!flag" label="车船号" :label-width="formLabelWidth">
                <el-input v-model="form.dShipNum"  placeholder="请输入车船号" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="!flag" label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.dPhone"  placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="!flag"  label="是否紧急" :label-width="formLabelWidth">
                <el-select v-model="form.isEmergency" placeholder="请选择是否紧急">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="!flag" label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.note"  placeholder="请输入备注" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="flag" label="到货日期" :label-width="formLabelWidth">
                <el-date-picker
                        v-model="form.planDeliverDateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

            <el-form-item v-else prop="planDeliverDate" label="到货日期" :rules="[{ required: true, message: '请选择计划到货日期', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-date-picker
                        v-model="form.planDeliverDate"
                        align="right"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { findSupplierList } from '../../../api/data/supplier'
  import { Message } from 'element-ui'
  export default {
    name: 'AsnHeadAdd',
    props: {
      data: Object,
      flag: Boolean
    },
    created() {
      findSupplierList({
        current: 1,
        size: -1
      }, {}).then(res => {
        if (res.code == 200) {
          this.supplierList = res.data.records
        } else {
          Message.error("获取供应商列表失败")
        }
      }).catch(e => {
        Message.error(e)
      })
    },
    data() {
      return {
        form: JSON.parse(JSON.stringify(this.data)),
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
        supplierList: [],
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
    methods: {
      changeSupplier(e) {
        this.$set(this.form, 'supplierId', e.supplierId)
        this.$set(this.form, 'supplierName', e.shortName)
      }
    },
    computed: {
      ...mapGetters([
        'dicDocStatusList',
        'dicSourceOrderTypeList',
        'dicAsnOrderTypeList',
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
    }
  }
</script>

<style scoped>

</style>
