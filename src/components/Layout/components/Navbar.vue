<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <logout id="logout" class="right-menu-item hover-effect" />
      <Notice class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="openUserInfoDialog">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="openPasswordChangeDialog">修改密码</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <UserInfoDialog ref="userInfoDialog" />
      <PasswordChangeDialog ref="passwordChangeDialog" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import UserInfoDialog from './UserInfoDialog/UserInfo'
import PasswordChangeDialog from './UserInfoDialog/PasswordChange'
import Logout from './Logout'
import Notice from '@/components/Notice'
const CAS_LOGOUT_URL = process.env.VUE_APP_CAS_LOGOUT_URL
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    UserInfoDialog,
    PasswordChangeDialog,
    Logout,
    Notice
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name',
      'loginName',
      'phone',
      'email'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      window.location.href = CAS_LOGOUT_URL
    },
    openUserInfoDialog() {
      this.$refs.userInfoDialog.openDialog(this.loginName, this.name, this.phone, this.email)
    },
    openPasswordChangeDialog() {
      this.$refs.passwordChangeDialog.openDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      float: right;
      color: #5a5e66;
      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -18px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
