<template>
  <div class="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <div class="item">
        <el-form :model="form" status-icon :rules="rules" ref="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input type="password" v-model="form.repassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input type="text" v-model="form.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register('form')">注册</el-button>
            <el-link
                type="primary"
                href="/login"
                style="float:right;margin-bottom:10px;"
            >已有账号？直接登录></el-link>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {Register} from '@/api/user'
  export default {
    name: "register",
    data(){
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (value.length===18) {
          callback(new Error('手机号长度需为11位'))
        }
        callback()
      }
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
        } else {
          if (this.form.repassword !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      var validateRePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return{
        form: {
          username:'',
          password:'',
          repassword: '',
          phone:'',
          validate: '',
        },
        rules: {
          username: [{validator: validateUser, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          repassword: [{validator: validateRePass, trigger: 'blur'}],
          phone: [{validator: validatePhone, trigger: 'blur'}],
        }
      }
    },
    methods:{
      async register(formName){
        const data=await Register(this.form)
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return
          }
          if (data.code == 200) {
            //提示操作，Message组件
            this.$baseMessage(data.msg, 'success')
            this.$router.push('/login')
          } else {
            this.$baseMessage(data.msg, 'error')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .register{
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
    margin-top: 80px;
    border-radius: 10px;
  }
</style>