<template>
  <el-dialog
    width="780px"
    title="修改密码"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form ref="dataForm" :label-position="labelPosition" label-width="100px" :rules="rules" :model="form">
      <el-row>
        <el-col :span="14">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input ref="dialogFirstInput" v-model="form.oldPassword" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="14">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="14">
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="changePassword">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { changePassword } from '@/api/user'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      labelPosition: 'right',
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    openDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.resetForm()
        this.$refs.dialogFirstInput.focus()
      })
    },
    changePassword() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          changePassword({ ...this.form }).then(response => {
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
          }).catch(() => {
            this.$message.error('密码修改失败')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
