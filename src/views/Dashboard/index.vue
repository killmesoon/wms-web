<template>
  <div class="app-container">
    <Authorized :authority="['ROLE_ADMIN']">
      <div class="box">
        <div class="system-logo">
          <img :src="logo" class="dashboard-logo">
        </div>
        <div class="system-title">
          欢迎使用EEPM-DEMO前端演示系统
        </div>
      </div>
    </Authorized>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      logo: require('@/assets/images/brand/business-brand-single.png')
    }
  },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
 .app-container{
   height: calc(100vh - 84px);
   background: #98D7E9;
 }
 .box{
   height:300px;
   margin: 0 auto;
   margin-top:10%;
   text-align: center;
 }
 .system-logo{
   width: 120px;
   height: 120px;
   border: 5px solid #E7FFFF;
   border-radius: 50%;
   margin: 0 auto;
   margin-bottom: 30px;
 }
 .dashboard-logo{
   width: 80px;
   margin-top: 25px;
 }
 .system-title{
   color: #E7FFFF;
   font-size: 42px;
   font-weight: 600;
   letter-spacing: 8px;
 }
</style>
