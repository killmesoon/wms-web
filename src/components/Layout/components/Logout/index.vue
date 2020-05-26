<template>
  <div>
    <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom-start">
      <svg-icon :icon-class="'logout'" @click="logout" />
    </el-tooltip>
  </div>
</template>

<script>
const CAS_LOGOUT_URL = process.env.VUE_APP_CAS_LOGOUT_URL
export default {
  name: 'Logout',
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      window.location.href = CAS_LOGOUT_URL
    }
  }
}
</script>

<style scoped>
.logout-svg {
  display: inline-block;
  cursor: pointer;
  fill: #011C1D;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
