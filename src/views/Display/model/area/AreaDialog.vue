<template>
    <div>
        <el-form :model="form" size="small" label-position="left" ref="areaForm" :inline="isFormInline">
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
            <el-form-item  v-if="searchFlag" label="区域编码" :label-width="formLabelWidth">
                <el-input v-model="form.areaCode"  autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="区域编码"  prop="areaCode" :rules="[{ required: true, message: '请选择输入区域编码', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.areaCode"  autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="searchFlag" prop="areaName"   label="区域名称" :label-width="formLabelWidth">
                <el-input v-model="form.areaName"  autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="区域名称" prop="areaName" :rules="[{ required: true, message: '请选择输入区域名称', trigger: 'blur' }]" :label-width="formLabelWidth">
                <el-input v-model="form.areaName"  autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item v-if="searchFlag" label="区域类型" :label-width="formLabelWidth">
                <el-select v-model="form.areaType" placeholder="请选择">
                    <el-option v-for="item in dicAreaTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="区域类型"   prop="areaType" :rules="[{ required: true, message: '请选择区域类型', trigger: 'change' }]" :label-width="formLabelWidth">
                <el-select v-model="form.areaType" placeholder="请选择">
                    <el-option v-for="item in dicAreaTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
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
            <el-form-item label="区域描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getWareHouseList} from '../../../../api/model/warehouse'
  import {Message} from 'element-ui'
  export default {
    name: 'AreaDialog',
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
      this.$set(this.form, 'wareHouse', {})
      this.$set(this.form, 'area', {})
    },
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
        this.form.areaType = e.areaType
        this.form.areaId = e.areaId
      }
    },
    computed: {
      ...mapGetters([
        'dicYNList',
        'dicAreaTypeList'
      ])
    },
    watch: {
      data(current, old) {
        this.$set(this.form, 'wareHouse', {})
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
