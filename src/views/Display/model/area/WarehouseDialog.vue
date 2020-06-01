<template>
    <div>
        <el-form :model="form" size="small" ref="warehouseForm" label-position="left" :inline="isFormInline">
            <el-form-item v-if="searchFlag" label="工厂编码" :label-width="formLabelWidth">
                <el-select v-model="form.plantCode" @change="plantChange" value-key="plantId">
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
                <el-select v-model="form.plantCode" @change="plantChange" value-key="plantId">
                    <el-option
                            v-for="item in plantList"
                            :key="item.plantId"
                            :label="item.plantCode"
                            :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="仓库类型" :label-width="formLabelWidth">
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
                <el-input v-model="form.plantName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="允许负库存" :label-width="formLabelWidth">
                <el-select v-model="form.negativeFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="允许负库存" :label-width="formLabelWidth" prop="negativeFlag"
                          :rules="[{ required: true, message: '请选择是否允许负库存', trigger: 'change' }]">
                <el-select v-model="form.negativeFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库编码" :label-width="formLabelWidth" v-if="searchFlag">
                <el-input v-model="form.warehouseCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="仓库编码" :label-width="formLabelWidth" prop="warehouseCode"
                          :rules="[{ required: true, message: '请输入仓库编码', trigger: 'blur' }]">
                <el-input v-model="form.warehouseCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否盘点" :label-width="formLabelWidth" v-if="searchFlag">
                <el-select v-model="form.panrangeFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否盘点" :label-width="formLabelWidth" prop="panrangeFlag"
                          :rules="[{ required: true, message: '请选择是否参与盘点', trigger: 'change' }]">
                <el-select v-model="form.panrangeFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="仓库名称" :label-width="formLabelWidth" prop="warehouseName">
                <el-input v-model="form.warehouseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="仓库名称" :label-width="formLabelWidth" prop="warehouseName"
                          :rules="[{ required: true, message: '请输入仓库名称', trigger: 'blur' }]">
                <el-input v-model="form.warehouseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否有效" :label-width="formLabelWidth" prop="enableFlag"
                          :rules="[{ required: true, message: '请选择是否有效', trigger: 'change' }]">
                <el-select v-model="form.enableFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="仓库简称" :label-width="formLabelWidth">
                <el-input v-model="form.shortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="仓库简称" :label-width="formLabelWidth" prop="shortName"
                          :rules="[{ required: true, message: '请输入仓库简称', trigger: 'blur' }]">
                <el-input v-model="form.shortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="仓库描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'WarehouseDialog',
    props: {
      data: Object,
      flag: Boolean
    },
    data() {
      return {
        form: JSON.parse(JSON.stringify(this.data)),
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
        ],
        searchFlag: true
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
    },
    watch: {
      data(current, old) {
        this.form = JSON.parse(JSON.stringify(current))
      },
      flag(current, old) {
        this.searchFlag = current
      }
    }
  }
</script>

<style scoped>

</style>
