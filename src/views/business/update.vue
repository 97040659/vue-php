<template>
  <el-form :model="form" status-icon ref="form">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input type="repassword" v-model="form.repassword" placeholder="新密码"></el-input>
    </el-form-item>
    <el-button type="primary" @click="update('form')">确认修改</el-button>
    <h2>{{data.msg}}</h2>
  </el-form>
</template>

<script>
  import {Update} from '@/api/user'
  export default {
    name: "delete",
    data(){
      return{
        form: {
          username:'',
          password:'',
          repassword:''
        },
        data:''
      }
    },
    methods:{
      async update(formName){
        this.data=await Update(this.form)
        console.log(this.data)
      }
    }
  }
</script>

<style scoped>

</style>