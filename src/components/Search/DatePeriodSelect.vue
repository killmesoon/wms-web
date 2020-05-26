<template>
  <el-date-picker
    v-model="selectedDate"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    style="width:280px"
    :picker-options="pickerOptions"
    :clearable="clearable"
    @change="getSelectedDate"
  />
</template>
<script>
export default {
  props: {
    defaultPeriodDate: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }]
      },
      selectedDate: ''
    }
  },
  mounted() {
    this.selectedDate = this.defaultPeriodDate
  },
  methods: {
    getSelectedDate() {
      let datePeriod = []
      if (this.selectedDate != null) {
        const startDate = this.selectedDate[0]
        const endDate = this.selectedDate[1]
        datePeriod = [this.$moment(startDate).format('YYYY-MM-DD'), this.$moment(endDate).format('YYYY-MM-DD')]
      }
      this.$emit('getSelectedDate', datePeriod)
    }
  }
}
</script>
