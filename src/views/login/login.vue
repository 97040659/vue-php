<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <div class="item">
        <el-form :model="form" status-icon :rules="rules" ref="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('form')">登录</el-button>
            <el-link
                type="primary"
                href="/register"
                style="float:right;margin-bottom:10px;"
            >没有账号？请先注册>
            </el-link>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {Login} from '@/api/user'

  export default {
    name: "login",
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (value.length < 5 || value.length > 15) {
          callback(new Error('用户名长度需在5到15之间'))
        }
        callback()
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 16) {
          callback(new Error('密码长度需在6到16之间'))
        }
        callback()
      }
      return {
        form: {
          username: '',
          password: '',
          validate: '',
        },
        rules: {
          username: [{validator: validateUser, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
        }
      }
    },
    methods: {
      async login(formName) {
        const data = await Login(this.form)
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return
          }
          if (data.code == 200) {
            //提示操作，Message组件
            this.$baseMessage(data.msg, 'success')
            //存入Session
            window.sessionStorage.setItem('token', data.token)
            let jwt = require('jsonwebtoken');
            let uid = jwt.decode(data.token).uid
            let acc = jwt.decode(data.token).acc
            window.sessionStorage.setItem('userid', uid)
            window.sessionStorage.setItem('AccessToken', acc)
            // console.log(window.sessionStorage.getItem('userid'))
            //跳转
            if (acc == 'buyer-accessToken') {
              this.$router.push('/buyer')
            } else if (acc == 'business-accessToken') {
              this.$router.push('/business')
            }
          } else {
            this.$baseMessage(data.msg, 'error')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin: 0 auto;
    width: 300px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 0 auto;
    text-align: center;
    width: 400px;
    top: 100px;
    margin-top: 100px;
    border-radius: 10px;
  }

  .box-card .line {
    height: 30px;
    width: 300px;
    margin: 0 auto;
    border-bottom: 1px solid #c0c0c0;
  }

  /*其他账号登录*/
  .box-card .logo {
    width: 300px;
    margin: 0 auto;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .box-card .logo .logo-info {
    font-size: 14px;
    color: #757575;
  }

  .box-card .logo .logo-login {
    height: 15px;
    margin-left: 10px;
  }

  /*其他账号登录END*/
</style>