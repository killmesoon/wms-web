<template>
  <div class="filter">
    <div class="filter-top">
      <div v-if="hasKeywordSearchInput" class="search-input">
        <el-input
          v-model="queryObject[keywordQueryTitle]"
          :placeholder="keyWordPlaceHolder"
          style="width:350px;"
          @keyup.enter.native="getListQueryData"
        />
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click.stop="getListQueryData"
        />
      </div>
      <div v-for="(item, index) in defaultFilterOptions" :key="index">
        <div
          v-if="item.type == 'singleSelect'"
          class="filter-item single-select"
        >
          <label class="filter-title">{{ item.label }}：</label>
          <div
            v-for="singleItem in item.data"
            :key="singleItem.value"
            class="single-item"
            :class="{ active: singleItem.checked }"
            @click="
              changeSingleSelectState(item.data, singleItem, item.queryTitle)
            "
          >
            <svg-icon
              v-if="item.hasIcon"
              :icon-class="singleItem.checked ? 'level-active' : 'level'"
            />
            {{ singleItem.label }}
          </div>
        </div>
      </div>
      <slot />
      <div
        v-if="filterOptions.length > 0"
        class="filter-icon"
        @click="changeFilterState"
      >
        <svg-icon icon-class="filter" /><span>{{
          showState === false ? "展开筛选条件" : "收起筛选条件"
        }}</span>
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="showState" class="filter-content">
        <div v-for="(item, index) in filterOptions" :key="index">
          <div
            v-if="item.type == 'singleSelect'"
            class="filter-item single-select"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <div
              v-for="singleItem in item.data"
              :key="singleItem.value"
              class="single-item"
              :class="{ active: singleItem.checked }"
              @click="
                changeSingleSelectState(item.data, singleItem, item.queryTitle)
              "
            >
              <svg-icon
                v-if="item.hasIcon"
                :icon-class="singleItem.checked ? 'level-active' : 'level'"
              />
              {{ singleItem.label }}
            </div>
          </div>
          <div
            v-if="item.type == 'radioSelect'"
            class="filter-item radio-select"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <el-radio-group v-model="queryObject[item.queryTitle]" size="small">
              <el-radio
                v-for="radioItem in item.data"
                :key="radioItem.value"
                :label="radioItem.value"
                border
              >{{ radioItem.label }}</el-radio>
            </el-radio-group>
          </div>
          <div
            v-if="item.type == 'multipleSelect'"
            class="filter-item multiple-select"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <el-select
              v-model="queryObject[item.queryTitle]"
              size="small"
              multiple
              placeholder="请选择（支持多选）"
              style="width:300px;"
              @change="getListQueryData"
            >
              <el-option
                v-for="multipleItem in item.data"
                :key="multipleItem.value"
                :label="multipleItem.label"
                :value="multipleItem.value"
              />
            </el-select>
          </div>
          <div
            v-if="item.type == 'singleTreeSelect'"
            class="filter-item"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <TreeSelect
              v-model="queryObject[item.queryTitle]"
              :clearable="true"
              :props="item.defaultProps"
              :options="item.data"
              :accordion="true"
              @getValue="getListQueryData"
            />
            <!-- <label v-show="queryObject[item.queryTitle]!=null" class="filter-title primary-text">清除</label> -->

          </div>

          <div
            v-if="item.type == 'multipleTreeSelect'"
            class="filter-item multiple-select"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <MultipleTreeSelect
              v-model="queryObject[item.queryTitle]"
              style="display:inline-block"
              :data="item.data"
              :width="item.width"
              :height="item.height"
              :check-strictly="true"
              :default-props="item.defaultProps"
              multiple
              :node-key="item.nodeKey"
              @popoverHide="getListQueryData"
            />
          </div>
          <div v-if="item.type == 'dateSelect'" class="filter-item date-select">
            <label class="filter-title">{{ item.label }}：</label>
            <div
              v-for="dateItem in dateOptions"
              ref="dateItem.value?'dateSapan:' '"
              :key="dateItem.value"
              class="single-item"
              :class="{ active: dateItem.checked }"
              @click="changeDateSelectState(item, dateOptions, dateItem)"
            >
              {{ dateItem.label }}
              <el-date-picker
                v-if="dateItem.value == 'custom'"
                v-model="dateValue"
                class="date-input"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                @change="getDate(item, dateItem)"
              />
              <i
                v-if="dateItem.value == 'custom' && dateValue"
                class="el-icon-circle-close emptyDate"
                @click.stop="emptyDate(item, dateItem)"
              />
            </div>
          </div>
          <div
            v-if="item.type == 'keyWordSearch'"
            class="filter-item keyWord-search"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <el-input
              v-model="queryObject[item.queryTitle]"
              style="width:300px;height:25px;"
              placeholder="请输入内容"
              size="small"
              @keyup.enter.native="getListQueryData"
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </div>
          <div
            v-if="item.type == 'addressSelect'"
            class="filter-item keyWord-search"
          >
            <label class="filter-title">{{ item.label }}：</label>
            <el-cascader
              v-model="addressSelectedOptions"
              size="large"
              clearable
              :props="item.props"
              :options="item.options"
              @change="handleAddressChange(item)"
            />
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import MultipleTreeSelect from '../MultipleTreeSelect/index.vue'
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import TreeSelect from '@/components/TreeSelect'

export default {
  components: {
    MultipleTreeSelect,
    TreeSelect
  },
  props: {
    defaultFilterOptions: {
      type: Array,
      default: () => [],
      required: true
    },
    filterOptions: {
      type: Array,
      default: () => [],
      required: true
    },
    listQuery: {
      type: Object,
      default: null,
      required: true
    },
    filterShowState: {
      type: Boolean,
      default: false
    },
    hasKeywordSearchInput: {
      type: Boolean,
      default: true
    },
    keywordQueryTitle: {
      type: String,
      default: 'keywords'
    },
    keyWordPlaceHolder: {
      type: String,
      default: '支持关键字搜索'
    }
  },
  data() {
    return {
      // 地址选择
      addressSelectedOptions: [],
      // 树状多选
      multipleTreeSelectTitle: '',
      //
      queryObject: {},
      showState: '',
      dateOptions: [
        {
          value: '',
          label: '不限',
          checked: true
        },
        {
          value: 'today',
          label: '今天',
          checked: false
        },
        {
          value: 'yesterday',
          label: '昨天',
          checked: false
        },
        {
          value: 'sevenDays',
          label: '最近七天',
          checked: false
        },
        {
          value: 'thirtyDays',
          label: '最近30天',
          checked: false
        },
        {
          value: 'custom',
          label: '自定义',
          checked: false
        }
      ],
      multipleValue: [],
      dateValue: null
    }
  },
  watch: {
    listQuery() {
      this.queryObject = JSON.parse(JSON.stringify(this.listQuery))
    }
  },
  created() {
    this.showState = this.filterShowState
  },
  mounted() {
    this.queryObject = JSON.parse(JSON.stringify(this.listQuery))
  },
  methods: {
    popoverHide(checkedIds, checkedData) {},
    // 下拉状态维护
    changeFilterState() {
      this.showState = !this.showState
      this.$emit('changeFilterShowState', this.showState)
    },
    // 修改单选选中状态触发子组件传值
    changeSingleSelectState(singleOptions, singleItem, queryTitle) {
      singleOptions.forEach(singleItem => {
        singleItem.checked = false
      })
      singleItem.checked = true
      this.queryObject[queryTitle] = singleItem.value
      this.$emit('getSelectData', this.queryObject)
      // this.$emit('getSelectDataLabel', dateItem.label)
    },
    // 修改日期选中状态触发子组件传值
    changeDateSelectState(item, dateOptions, dateItem) {
      this.dateOptions.forEach(singleItem => {
        singleItem.checked = false
      })
      if (dateItem.value === '') {
        this.queryObject[item.queryStartDateTitle] = null
        this.queryObject[item.queryEndDateTitle] = null
        this.getListQueryData()
      } else if (dateItem.value === 'today') {
        const date = this.$moment().format('YYYY-MM-DD')
        this.queryObject[item.queryStartDateTitle] = date
        this.queryObject[item.queryEndDateTitle] = date
        this.getListQueryData()
      } else if (dateItem.value === 'yesterday') {
        const date = this.$moment(new Date())
          .add(-1, 'days')
          .format('YYYY-MM-DD')
        this.queryObject[item.queryStartDateTitle] = date
        this.queryObject[item.queryEndDateTitle] = date
        this.getListQueryData()
      } else if (dateItem.value === 'sevenDays') {
        const startDate = this.$moment(new Date())
          .add(-7, 'days')
          .format('YYYY-MM-DD')
        const endDate = this.$moment().format('YYYY-MM-DD')
        this.queryObject[item.queryStartDateTitle] = startDate
        this.queryObject[item.queryEndDateTitle] = endDate
        this.getListQueryData()
      } else if (dateItem.value === 'thirtyDays') {
        const startDate = this.$moment(new Date())
          .add(-30, 'days')
          .format('YYYY-MM-DD')
        const endDate = this.$moment().format('YYYY-MM-DD')
        this.queryObject[item.queryStartDateTitle] = startDate
        this.queryObject[item.queryEndDateTitle] = endDate
        this.getListQueryData()
      }
      dateItem.checked = true

      this.$emit('getSelectDataLabel', dateItem.label)
    },
    // 时间选择器触发子组件传值
    getDate(item, dateItem) {
      if (this.dateValue && this.dateValue.length > 0) {
        const startDate = this.$moment(this.dateValue[0]).format('YYYY-MM-DD')
        const endDate = this.$moment(this.dateValue[1]).format('YYYY-MM-DD')
        dateItem.label = startDate + ' - ' + endDate
        this.queryObject[item.queryStartDateTitle] = startDate
        this.queryObject[item.queryEndDateTitle] = endDate
        this.getListQueryData()
      } else {
        this.queryObject[item.queryStartDateTitle] = null
        this.queryObject[item.queryEndDateTitle] = null
        this.getListQueryData()
      }
      this.$emit('getSelectDataLabel', dateItem.label)
    },
    // 子组件传值
    getListQueryData() {
      this.$emit('getSelectData', this.queryObject)
    },
    // 清楚时间选择
    emptyDate(item, dateItem) {
      this.dateValue = null
      dateItem.checked = false
      dateItem.label = '自定义'
      this.dateOptions[0].checked = true
      this.getDate(item, dateItem)
    },
    // 地址选择变化
    handleAddressChange(item) {
      this.queryObject[item.queryTitle] = this.addressSelectedOptions
      this.getListQueryData()
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #e9e9e9;
// $active-color: #027AFF;
$active-color: #027AFF;
.filter {
  font-size: 14px;
  line-height: 30px;
  font-weight: 500;
  cursor: pointer;
  background: #ffffff;
  // border: 1px solid $border-color;
  .filter-top {
    overflow: hidden;
    border-bottom: 1px solid $border-color;
    position: relative;
    .search-input {
      // margin-top:10px;
      margin-left: 10px;
      float: left;
    }
    .filter-icon {
      // padding: 10px 20px;
      margin-top: 2px;
      margin-right: 20px;
      margin-bottom: 5px;
      // float: right;
      bottom: 5px;
      right: 10px;
      position: absolute;
      span {
        color: $active-color;
      }
    }
    .filter-item {
      margin: 15px 5px;
      clear: both;
      margin-right: 100px;
      .filter-title {
        display: inline-block;
        width: 90px;
        text-align: right;
        font-weight: normal;
        font-size: 14px;
      }
      .single-item {
        padding: 0px 10px;
        margin-top: 5px;
        margin-right: 15px;
        border-radius: 5px;
        font-size: 13px;
        border: 1px solid $border-color;
        display: inline-block;
        line-height: 27px;
      }
      .active {
        background: $active-color;
        color: #ffffff;
        border: none;
      }
    }
  }
  .filter-content {
    padding: 10px;
    color: #303133;
    background: #f2f6fc;
    z-index: 999;
    .filter-item {
      margin: 20px 5px;
      .filter-title {
        display: inline-block;
        width: 100px;
        text-align: right;
        font-weight: normal;
        font-size: 14px;
      }
      .single-item {
        padding: 0px 10px;
        margin-right: 15px;
        border-radius: 5px;
        font-size: 13px;
        border: 1px solid $border-color;
        display: inline-block;
        line-height: 27px;
      }
      .active {
        background: $active-color;
        color: #ffffff;
        border: none;
      }
    }
    .date-select {
      span {
        position: relative;
      }
      .date-input {
        width: 80%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0;
        cursor: pointer;
        opacity: 0;
      }
      .emptyDate {
        cursor: pointer;
      }
      .emptyDate:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
