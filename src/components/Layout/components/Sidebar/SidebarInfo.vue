<template>
  <div class="sidebar-info-wrapper">
    <ul>
      <li>
        <p>Disk space</p>
        <div class="num"><count-to :start-val="0" :end-val="78" decimal="2" :duration="2000" />%</div>
        <p>Loading...</p>
      </li>
      <li>
        <p>CPU</p>
        <div class="num"><count-to :start-val="0" :end-val="56" decimal="2" :duration="2000" />%</div>
        <p>Loading..</p>
      </li>
      <li>
        <p>Memory</p>
        <div class="num"><count-to :start-val="0" :end-val="14" decimal="2" :duration="2000" />%</div>
        <p>Loading..</p>
      </li>
    </ul>
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  }
}
</script>
<style lang="scss" scoped>
  .sidebar-info-wrapper{
    color: #768399;
    font-size: 20px;
    padding: 20px;
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      li{
        margin-bottom: 25px;
        p{
          margin: 0px;
          font-size:14px;
        }
        .num{
          margin-top:5px;
          margin-bottom: 5px;
          font-size: 28px;
        }
      }
    }
  }
</style>
