<template>
    <div>
        <el-form :model="form" size="small" :rules="rules" label-position="right" ref="areaForm" :inline="isFormInline">
            <el-form-item v-if="flag" label="工厂编码" :label-width="formLabelWidth"
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
                <el-select v-model="form.plantCode" placeholder="请选择工厂编码" @change="plantChange" value-key="plantId">
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
            <el-form-item v-if="flag" label="仓库编码" :label-width="formLabelWidth"
            >
                <el-select v-model="form.wareHouse" placeholder="请选择仓库编码" @change="warehouseChange"
                           value-key="warehouseCode">
                    <el-option v-for="wareHouse in warehouseList" :key="wareHouse.warehouseId"
                               :label="wareHouse.warehouseCode"
                               :value="wareHouse">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="仓库编码" :label-width="formLabelWidth" prop="warehouseCode"
                          :rules="[{ required: true, message: '请选择仓库编码', trigger: 'change' }]">
                <el-select v-model="form.warehouseCode" placeholder="请选择仓库编码" @change="warehouseChange"
                           value-key="warehouseCode">
                    <el-option v-for="wareHouse in warehouseList" :key="wareHouse.warehouseId"
                               :label="wareHouse.warehouseCode"
                               :value="wareHouse">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="仓库名称" :label-width="formLabelWidth">
                <el-input v-model="form.warehouseShortName" :disabled="disable" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="flag" label="区域编码" :label-width="formLabelWidth">
                <el-input v-model="form.areaCode" placeholder="请定义区域编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="区域编码" prop="areaCode" :label-width="formLabelWidth">
                <el-input v-model="form.areaCode" placeholder="请定义区域编码" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-if="flag"  label="区域名称" :label-width="formLabelWidth">
                <el-input v-model="form.areaName" placeholder="请输入区域名称" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item v-else label="区域名称" prop="areaName"
                          :rules="[{ required: true, message: '请选择输入区域名称', trigger: 'blur' }]"
                          :label-width="formLabelWidth">
                <el-input v-model="form.areaName" placeholder="请输入区域名称" autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item v-if="flag" label="区域类型" :label-width="formLabelWidth">
                <el-select v-model="form.areaType" placeholder="请选择区域类型">
                    <el-option v-for="item in dicAreaTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-else label="区域类型" prop="areaType"
                          :rules="[{ required: true, message: '请选择区域类型', trigger: 'change' }]"
                          :label-width="formLabelWidth">
                <el-select v-model="form.areaType" placeholder="请选择区域类型">
                    <el-option v-for="item in dicAreaTypeList" :value="item.dicId" :key="item.dicId"
                               :label="item.dicName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="flag" label="是否有效" :label-width="formLabelWidth" >
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
            <el-form-item label="区域描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" placeholder="请输入区域描述" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getWareHouseList } from '../../../../api/model/warehouse'
  import { checkAreaCodeExits } from '../../../../api/data/area'
  import { Message } from 'element-ui'

  export default {
    name: 'AreaDialog',
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
    },
    data() {
      var checkWarehouseAreaCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请定义区域编码'))
        }
        if (this.editFlag) {
          callback()
        } else {
          setTimeout(() => {
            //校验物料编码是否存在
            checkAreaCodeExits({
              areaCode: value
            }).then(res => {
              if (res.data) {
                //存在相同
                callback()
              } else {
                return callback(new Error('该区域编码已存在'))
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
        disable: true,
        formLabelWidth: '100px',
        warehouseList: [],
        plantList: [
          {
            id: 1,
            plantId: 1,
            plantName: '上海外高桥一厂',
            plantCode: 'WGQ1'
          }
        ],
        rules: {
          areaCode: [
            { required: true, validator: checkWarehouseAreaCode, trigger: 'blur' }
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
        }
      },
      flag(current, old) {
        this.flag = current
      },
      editFlag(current, old) {
        this.editFlag = current
      }
    }
  }
</script>



<style scoped>

</style>
