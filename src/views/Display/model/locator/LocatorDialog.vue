<template>
    <div>
        <el-form :model="form" size="small" label-position="right" :rules="rules" ref="locatorForm" :inline="isFormInline">
            <el-form-item v-if="flag" label="工厂编码" :label-width="formLabelWidth" prop="plantCode"
            >
                <el-select v-model="form.plantCode" @change="plantChange" placeholder="请选择工厂编码" value-key="plantId">
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
                <el-select v-model="form.plantCode" @change="plantChange" placeholder="请选择工厂编码" value-key="plantId">
                    <el-option
                            v-for="item in plantList"
                            :key="item.plantId"
                            :label="item.plantCode"
                            :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="工厂名称" :label-width="formLabelWidth">
                <el-input v-model="form.plantName" :disabled="disable" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="仓库编码" :label-width="formLabelWidth" prop="wareHouse.warehouseCode"
            >
                <el-select v-model="form.wareHouse" @change="warehouseChange" placeholder="请选择工厂编码"
                           value-key="warehouseId">
                    <el-option v-for="wareHouse in warehouseList" :key="wareHouse.warehouseId"
                               :label="wareHouse.warehouseCode"
                               :value="wareHouse">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="仓库编码" :label-width="formLabelWidth" prop="warehouseCode"
                          :rules="[{ required: true, message: '请选择仓库编码', trigger: 'change' }]">
                <el-select v-model="form.warehouseCode" @change="warehouseChange" placeholder="请选择工厂编码"
                           value-key="warehouseId">
                    <el-option v-for="wareHouse in warehouseList" :key="wareHouse.warehouseId"
                               :label="wareHouse.warehouseCode"
                               :value="wareHouse">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库名称" :label-width="formLabelWidth">
                <el-input v-model="form.warehouseShortName" :disabled="disable" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="区域编码" :label-width="formLabelWidth" prop="area.areaCode"
            >
                <el-select v-model="form.area" value-key="areaId" placeholder="请选择区域编码" @change="areaChange">
                    <el-option v-for="area in areaList" :label="area.areaName" :key="area.areaId"
                               :value="area"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="区域编码" :label-width="formLabelWidth" prop="areaCode"
                          :rules="[{ required: true, message: '请选择区域编码', trigger: 'change' }]">
                <el-select v-model="form.areaCode" value-key="areaId" placeholder="请选择区域编码" @change="areaChange">
                    <el-option v-for="area in areaList" :label="area.areaName" :key="area.areaId"
                               :value="area"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="区域类型" :label-width="formLabelWidth">
                <el-input v-model="form.areaTypeDic" :disabled="disable" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="货位编码" :label-width="formLabelWidth">
                <el-input v-model="form.locatorCode" placeholder="请定义货位编码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="货位编码" :label-width="formLabelWidth" prop="locatorCode">
                <el-input v-model="form.locatorCode" placeholder="请定义货位编码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="货位名称" :label-width="formLabelWidth" prop="locatorName">
                <el-input v-model="form.locatorName" placeholder="请输入货位名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="货位名称" :label-width="formLabelWidth" prop="locatorName"
                          :rules="[{ required: true, message: '请输入货位名称', trigger: 'blur' }]">
                <el-input v-model="form.locatorName" placeholder="请输入货位名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="货位类型" :label-width="formLabelWidth" prop="locatorType">
                <el-select v-model="form.locatorType" placeholder="请选择货位类型">
                    <el-option v-for="item in dicLocatorTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="货位类型" :label-width="formLabelWidth" prop="locatorType"
                          :rules="[{ required: true, message: '请选择货位类型', trigger: 'change' }]">
                <el-select v-model="form.locatorType" placeholder="请选择货位类型">
                    <el-option v-for="item in dicLocatorTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地理位置" :label-width="formLabelWidth">
                <el-input v-model="form.gpsInfo" placeholder="请输入地理位置" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="是否有效" :label-width="formLabelWidth" prop="enableFlag">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="是否有效" :label-width="formLabelWidth" prop="enableFlag"
                          :rules="[{ required: true, message: '请选择是否有效', trigger: 'change' }]">
                <el-select v-model="form.enableFlag" placeholder="请选择是否有效">
                    <el-option v-for="item in dicYNList" :value="item.dicCode" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货位描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" placeholder="请输入货位描述" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {  getWareHouseList } from '../../../../api/model/warehouse'
  import { queryWarehouseAreaList } from '../../../../api/data/area'
  import { checkLocatorCodeExits } from '../../../../api/model/locator'
  import { Message } from 'element-ui'

  export default {
    name: 'LocatorDialog',
    props: {
      data: Object,
      flag: Boolean,
      editFlag: Boolean
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
    },
    data() {
      var checkLocatorCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请定义货位编码'))
        }
        if (this.editFlag) {
          callback()
        } else {
          setTimeout(() => {
            //校验物料编码是否存在
            checkLocatorCodeExits({
              locatorCode: value
            }).then(res => {
              if (res.data) {
                //存在相同
                callback()
              } else {
                return callback(new Error('该货位编码已存在'))
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
        warehouseList: [],
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一场',
            plantCode: 'WGQ1'
          }
        ],
        areaList: [],
        disable: true,
        rules: {
          locatorCode: [
            { required: true, validator: checkLocatorCode, trigger: 'blur' }
          ]
        }
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
      data: {
        immediate: true,
        handler: function(current, old) {
          this.form = JSON.parse(JSON.stringify(current))
          if (this.form.enableFlag != null) {
            this.form.enableFlag = this.form.enableFlag ? '1' : '0'
          }
          if (this.form.areaType != null) {
            this.form.areaType = parseInt(this.form.areaType)
          }
          if (this.form.locatorType != null) {
            this.form.locatorType = parseInt(this.form.locatorType)
          }
        }
      },
      flag(current, old) {
        this.flag = current
      }
    }
  }
</script>

<style scoped>

</style>
