<template>
  <div class="user-pass" id="user-pass" name="user-pass">
    <div class="user-pass-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="user-pass-content">
            <div class="extra"></div>
            <div class="user-pass-title">
              <p>修改密码</p>
            </div>
            <div class="user-pass-form">
              <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword">
                  <el-input type="password" v-model="form.repassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="extra"></div>
            <div class="extra"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import CenterMenu from "@/components/CenterMenu";
  import {Update} from "@/api/user";

  export default {
    name: "UserPass",
    components: {
      CenterMenu
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 16) {
          callback(new Error('密码长度需在6到16之间'))
        } else {
          if (this.form.repassword !== '') {
            this.$refs.form.validateField('password_confirm')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          username:'',
          password: '',
          repassword: '',
          userid: '',
        },
        rules: {
          password: [{ validator: validatePass, trigger: 'blur' }],
          repassword: [{ validator: validatePass2, trigger: 'blur' }]
        },
        totalTime: 30,
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.form.userid = this.$store.getters.getBuyer.UserId
            Update(this.form)
            this.$refs[formName].resetFields()
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },

  }
</script>

<style scoped>
  .user-pass-layout {
    max-width: 1225px;
    margin: 0 auto;
  }
  .user-pass-content {
    background-color: #ffffff;
    margin-bottom: 30px;
  }
  .user-pass-title {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .user-pass-title p {
    font-size: 30px;
    color: #757575;
    margin-left: 50px;
  }
  .extra {
    height: 10px;
  }
  .user-pass-form {
    width: 500px;
  }
  .bind-email {
    margin-left: 50px;
    color: #757575;
  }
  .bind-email .bind-email-href {
    color: #757575;
    margin-left: 5px;
    margin-right: 5px;
  }
  .bind-email .bind-email-href:hover {
    color: #ff6700;
  }
</style>