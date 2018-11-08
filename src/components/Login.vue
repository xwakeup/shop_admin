<template>
  <div class="login">
    <el-form  :model="form" label-width="80px" :rules="rules" ref="form">
      <img src="../assets/gogoya.jpg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click='reset'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 重置功能
    reset() {
      this.$refs.form.resetFields()
    },
    // 登录功能
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 发送ajax请求
          axios({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.form
          }).then(res => {
            if (res.data.meta.status === 200) {
              // 登录成功
              this.$message.success(res.data.meta.msg)
              // 存储token
              localStorage.setItem('token', res.data.data.token)
              // 跳转到home组件
              this.$router.push('./home')
              console.log(res.data)

              console.log('登录成功')
            } else {
              this.$message.error(res.data.meta.msg)
              console.log('登录失败')
            }
          })
        } else {
          console.log('登录失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 400px;
    margin: 200px auto;
    background-color: #fff;
    padding: 75px 40px 15px;
    border-radius: 20px;
    position: relative;
    img {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button + .el-button {
      margin-left: 70px;
    }
  }
}
</style>
