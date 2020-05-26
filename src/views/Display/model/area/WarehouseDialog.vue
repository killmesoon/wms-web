<template>
    <div>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item  label="工厂编码" :label-width="formLabelWidth">
               <el-select v-model="form.plantCode" @change="plantChange" value-key="plantId">
                   <el-option
                           v-for="item in plantList"
                           :key="item.plantId"
                           :label="item.plantCode"
                           :value="item"
                   />
               </el-select>
            </el-form-item>
            <el-form-item label="仓库类型" :label-width="formLabelWidth">
                <el-select v-model="form.warehouseType" placeholder="请选择仓库类型">
                    <el-option v-for="item in dicWarehouseTypeList" :key="item.dicCode" :label="item.dicName"
                    :value="item.dicId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="工厂名称" :label-width="formLabelWidth">
                <el-input v-model="form.plantName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="允许负库存" :label-width="formLabelWidth">
                <el-select v-model="form.negativeFlag" placeholder="请选择" >
                    <el-option v-for="item in dicYNList" :value="item.dicCode"  :key="item.dicId" :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item  label="仓库编码" :label-width="formLabelWidth">
                <el-input  v-model="form.warehouseCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="是否参与盘点" :label-width="formLabelWidth">
                <el-select v-model="form.panrangeFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId" :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="仓库名称" :label-width="formLabelWidth">
                <el-input  v-model="form.warehouseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId" :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item  label="仓库简称" :label-width="formLabelWidth">
                <el-input v-model="form.shortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="仓库描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'WarehouseDialog',
    props:{
      form: Object,
      flag: Boolean
    },
    data() {
      return {
        isFormInline: true,
        formLabelWidth: '100px',
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
        ]
      }
    },
    methods: {
      plantChange(item) {
        console.log(item)
        this.form.plantName = item.plantName
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList',
        'dicWarehouseTypeList'
      ])
    }
  }
</script>

<style scoped>

</style>
