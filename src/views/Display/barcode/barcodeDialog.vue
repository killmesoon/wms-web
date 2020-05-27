<template>
    <div>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item label="工厂编码" :label-width="formLabelWidth">
                <el-select v-model="form.plantCode" @change="plantChange" value-key="plantId">
                    <el-option
                            v-for="item in plantList"
                            :key="item.plantId"
                            :label="item.plantCode"
                            :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="工厂名称" :label-width="formLabelWidth">
                <el-input v-model="form.plantName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="条码号" :label-width="formLabelWidth">
                <el-input v-model="form.barcode" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="条码类型" :label-width="formLabelWidth">
                <el-select v-model="form.barcodeType" placeholder="请选择">
                    <el-option v-for="item in dicBarcodeTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条码状态" :label-width="formLabelWidth">
                <el-select v-model="form.barcodeStatus" placeholder="请选择">
                    <el-option v-for="item in dicBarcodeStatusList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条码描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商编码" :label-width="formLabelWidth">
                <el-select v-model="form.supplierCode"  @change="warehouseChange" value-key="supplierId">
                    <el-option v-for="item in supplierList"
                               :label="item.supplierCode" :key="item.supplierId" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商名称" :label-width="formLabelWidth">
                <el-input v-model="form.supplierName" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {findSupplierList} from '../../../api/data/supplier'
  import {Message} from 'element-ui'
  export default {
    name: 'barcodeDialog',
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
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
    },
    data() {
      return {
        form: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        formLabelWidth: '100px',
        supplierList: [],
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一场',
            plantCode: 'WGQ1'
          },
          {
            id: 2,
            plantId: 2,
            plantName: '上海外高桥二场',
            plantCode: 'WGQ2'
          }
        ],
        areaList: [
          {
            areaId: 1,
            areaCode: 'A',
            areaName: '区域A',
            areaType: '类型A'
          },
          {
            areaId: 2,
            areaCode: 'B',
            areaName: '区域B',
            areaType: '类型B'
          },
          {
            areaId: 3,
            areaCode: 'C',
            areaName: '区域C',
            areaType: '类型C'
          }
        ]
      }
    },
    methods: {
      plantChange(item) {
        this.form.plantName = item.plantName
      },
      warehouseChange(e) {
        this.form.supplierCode = e.supplierCode
        this.form.supplierId = e.supplierId
        this.form.supplierName = e.supplierName
      },
      areaChange(e) {
        this.form.areaName = e.areaName
        this.form.areaType = e.areaType
        this.form.areaId = e.areaId
      }
    },
    computed: {
      ...mapGetters([
        'dicBarcodeStatusList',
        'dicBarcodeTypeList'
      ])
    },
    watch: {
      data(current, old) {
        this.form = JSON.parse(JSON.stringify(current))
      }
    }
  }
</script>

<style scoped>

</style>
