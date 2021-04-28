<template>
  <el-form :model="form" status-icon ref="form">
    <el-form-item prop="userid">
      <el-input v-model="form.userid" placeholder="用户id"></el-input>
    </el-form-item>
    <el-button type="primary" @click="logout('form')">确认删除</el-button>
    <h2>{{data.msg}}</h2>
  </el-form>
</template>

<script>
  import {Logout} from '@/api/user'
  export default {
    name: "delete",
    data(){
      return{
        form: {
          userid:'',
          password:''
        },
        data:''
      }
    },
    methods:{
      async logout(formName){
        this.data=await Logout(this.form)
        console.log(this.data)
      }
    }
  }
</script>

<style scoped>

</style>