<template>
  <el-dialog
    width="780px"
    title="个人信息"
    :visible.sync="dialogVisible"
    :append-to-body="true"
  >
    <el-form :label-position="labelPosition" label-width="80px">
      <el-row>
        <el-col :span="14">
          <el-form-item label="账号">
            <el-input v-model="loginName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="14">
          <el-form-item label="姓名">
            <el-input v-model="name" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="14">
          <el-form-item label="电话">
            <el-input v-model="phone" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="14">
          <el-form-item label="邮箱">
            <el-input v-model="email" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible=false">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'right',
      loginName: '',
      name: '',
      phone: '',
      email: ''
    }
  },
  methods: {
    openDialog(loginName, name, phone, email) {
      this.loginName = loginName
      this.name = name
      this.phone = phone
      this.email = email
      this.dialogVisible = true
    }
  }
}
</script>
