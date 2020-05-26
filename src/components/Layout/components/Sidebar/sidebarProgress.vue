<template>
  <div class="sidebar-progress-wrapper">
    <div class="progress-item">
      <p>Total Sales</p>
      <el-progress :percentage="salePercent" :stroke-width="6" :color="customColor" />
    </div>
    <div class="progress-item">
      <p>Customer Target</p>
      <el-progress :percentage="targetPercent" :stroke-width="6" color="#e6a23c" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customColor: '#37BC9B',
      salePercent: 0,
      targetPercent: 0
    }
  },
  created() {
    var saleTimer = null
    saleTimer = setInterval(() => {
      this.salePercent = this.salePercent + 10
      if (this.salePercent >= 45) {
        clearInterval(saleTimer)
      }
    }, 20)
    var targetTimer = null
    targetTimer = setInterval(() => {
      this.targetPercent = this.targetPercent + 10
      if (this.targetPercent >= 80) {
        clearInterval(targetTimer)
      }
    }, 20)
  },
  methods: {
    format(percentage) {
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .sidebar-progress-wrapper{
    color: #768399;
    font-size: 18px;
    padding: 20px;
    padding-top: 0;
    .progress-item{
      margin-bottom: 30px;
      p{
       margin-bottom: 5px;
      }
    }
  }
</style>
