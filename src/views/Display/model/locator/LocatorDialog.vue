<template>
    <div>
        <el-form :model="form" size="small" label-position="left" ref="locatorForm" :inline="isFormInline">
            <el-form-item v-if="searchFlag" label="工厂编码" :label-width="formLabelWidth" prop="plantCode"
                          >
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
            <el-form-item label="工厂名称" :label-width="formLabelWidth">
                <el-input v-model="form.plantName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="仓库编码" :label-width="formLabelWidth" prop="wareHouse.warehouseCode"
                          >
                <el-select v-model="form.wareHouse" @change="warehouseChange" value-key="warehouseId">
                    <el-option v-for="wareHouse in warehouseList" :key="wareHouse.warehouseId"
                               :label="wareHouse.warehouseCode"
                               :value="wareHouse">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="仓库编码" :label-width="formLabelWidth" prop="wareHouse.warehouseCode"
                          :rules="[{ required: true, message: '请选择仓库编码', trigger: 'change' }]">
                <el-select v-model="form.wareHouse" @change="warehouseChange" value-key="warehouseId">
                    <el-option v-for="wareHouse in warehouseList" :key="wareHouse.warehouseId"
                               :label="wareHouse.warehouseCode"
                               :value="wareHouse">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库名称" :label-width="formLabelWidth">
                <el-input v-model="form.warehouseShortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="区域编码" :label-width="formLabelWidth" prop="area.areaCode"
                          >
                <el-select v-model="form.area" value-key="areaId" placeholder="请选择" @change="areaChange">
                    <el-option v-for="area in areaList" :label="area.areaName" :key="area.areaId"
                               :value="area"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="区域编码" :label-width="formLabelWidth" prop="area.areaCode"
                          :rules="[{ required: true, message: '请选择区域编码', trigger: 'change' }]">
                <el-select v-model="form.area" value-key="areaId" placeholder="请选择" @change="areaChange">
                    <el-option v-for="area in areaList" :label="area.areaName" :key="area.areaId"
                               :value="area"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="区域类型" :label-width="formLabelWidth">
                <el-input v-model="form.areaTypeDic" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="货位编码" :label-width="formLabelWidth" prop="locatorCode" >
                <el-input v-model="form.locatorCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="货位编码" :label-width="formLabelWidth" prop="locatorCode" :rules="[{ required: true, message: '请输入货位编码', trigger: 'blur' }]">
                <el-input v-model="form.locatorCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="货位名称" :label-width="formLabelWidth" prop="locatorName">
                <el-input v-model="form.locatorName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="货位名称" :label-width="formLabelWidth" prop="locatorName" :rules="[{ required: true, message: '请输入货位名称', trigger: 'blur' }]">
                <el-input v-model="form.locatorName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="货位类型" :label-width="formLabelWidth" prop="locatorType" >
                <el-select v-model="form.locatorType" placeholder="请选择">
                    <el-option v-for="item in dicLocatorTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="货位类型" :label-width="formLabelWidth" prop="locatorType" :rules="[{ required: true, message: '请选择货位类型', trigger: 'change' }]">
                <el-select v-model="form.locatorType" placeholder="请选择">
                    <el-option v-for="item in dicLocatorTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地理位置" :label-width="formLabelWidth">
                <el-input v-model="form.gpsInfo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" label="是否有效" :label-width="formLabelWidth" prop="enableFlag" >
                <el-select v-model="form.enableFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否有效" :label-width="formLabelWidth" prop="enableFlag" :rules="[{ required: true, message: '请选择是否有效', trigger: 'change' }]">
                <el-select v-model="form.enableFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货位描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getWareHouseList } from '../../../../api/model/warehouse'
  import { queryWarehouseAreaList } from '../../../../api/data/area'
  import { Message } from 'element-ui'

  export default {
    name: 'LocatorDialog',
    props: {
      data: Object,
      flag: Boolean
    },
    created() {
      getWareHouseList({
        current: 1,
        size: -1
      }, {}).then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data.records
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
      queryWarehouseAreaList({
        current: 1,
        size: -1
      }, {}).then(res => {
        if (res.code == 200) {
          this.areaList = res.data.records
        }
      })
      this.$set(this.form, 'wareHouse', {})
      this.$set(this.form, 'area', {})
    },
    // mounted() {

    // },
    data() {
      return {
        form: JSON.parse(JSON.stringify(this.data)),
        isFormInline: true,
        formLabelWidth: '100px',
        warehouseList: [],
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
        areaList: [],
        searchFlag: true
      }
    },
    methods: {
      plantChange(item) {
        this.form.plantName = item.plantName
      },
      warehouseChange(e) {
        this.form.warehouseShortName = e.shortName
        this.form.warehouseId = e.warehouseId
      },
      areaChange(e) {
        this.form.areaName = e.areaName
        this.form.areaTypeDic = e.areaTypeDic
        this.form.areaId = e.areaId
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList',
        'dicLocatorTypeList'
      ])
    },
    watch: {
      data(current, old) {
        this.$set(this.form, 'wareHouse', {})
        this.$set(this.form, 'area', {})
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
