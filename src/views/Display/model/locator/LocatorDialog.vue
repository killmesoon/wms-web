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
            <el-form-item  label="工厂名称" :label-width="formLabelWidth">
                <el-input v-model="form.plantName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="仓库编码" :label-width="formLabelWidth">
                <el-select v-model="form.warehouseCode" @change="warehouseChange" value-key="warehouseId">
                    <el-option v-for="item in warehouseList"
                               :label="item.warehouseCode" :key="item.warehouseId" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="仓库名称" :label-width="formLabelWidth">
                <el-input  v-model="form.warehouseShortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="区域编码" :label-width="formLabelWidth">
                <el-select v-model="form.areaCode" value-key="areaId" placeholder="请选择" @change="areaChange" >
                    <el-option v-for="item in areaList" :label="item.areaName" :key="item.areaId" :value="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item  label="区域类型" :label-width="formLabelWidth">
                <el-input v-model="form.areaType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="货位编码" :label-width="formLabelWidth">
                <el-input v-model="form.locatorCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="货位名称" :label-width="formLabelWidth">
                <el-input v-model="form.locatorName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="货位类型" :label-width="formLabelWidth">
                <el-select v-model="form.locatorType" placeholder="请选择">
                    <el-option v-for="item in dicLocatorTypeList" :value="item.dicCode" :key="item.dicId" :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="地理位置" :label-width="formLabelWidth">
                <el-input v-model="form.gpsInfo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId" :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="货位描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {getWareHouseList} from '../../../../api/model/warehouse'
  import {Message} from 'element-ui'

  export default {
    name: 'LocatorDialog',
    props:{
      form: Object,
      flag: Boolean
    },
    created() {
      getWareHouseList({
        current: 1,
        size: -1
      },{}).then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data.records
        } else {
          Message.error(res.msg)
        }
      }).catch(e => {
        Message.error(e)
      })
    },
    data() {
      return {
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
        areaList: [
          {
            areaId: 1,
            areaCode : 'A',
            areaName: '区域A',
            areaType: '类型A'
          },
          {
            areaId: 2,
            areaCode : 'B',
            areaName: '区域B',
            areaType: '类型B'
          },
          {
            areaId: 3,
            areaCode : 'C',
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
        this.form.warehouseShortName = e.shortName
        this.form.warehouseId = e.warehouseId
      },
      areaChange(e) {
        this.form.areaName = e.areaName
        this.form.areaType = e.areaType
        this.form.areaId = e.areaId
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList',
        'dicLocatorTypeList'
      ])
    }
  }
</script>

<style scoped>

</style>
