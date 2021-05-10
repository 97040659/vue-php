<template>
  <div class="user-details" id="user-details" name="user-details">
    <div class="user-details-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="user-details-content">
            <div class="extra"></div>
            <div class="user-details-title">
              <p>个人信息</p>
            </div>
            <div class="user-details-form">
              <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
                <el-form-item label="头像:">
                  <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      action="http://www.phpdemo.com/api/Login/picture"
                      :headers="{'Content-Type':'multipart/form-data'}"
                      :before-upload="beforeUpload"
                      :show-file-list="false"
                      accept="image/png, image/jpeg"
                      list-type="picture-card"
                  >
                    <img v-if="form.HeadImg" :src="form.HeadImg" class="avatar">
<!--                    <el-avatar v-if="form.HeadImg" :src="form.HeadImg" :size="178" fit="scale-down"></el-avatar>-->
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">点击上传头像,只能上传png/jpg文件，且不超过2M</div>
                  </el-upload>
                </el-form-item>
                <el-form-item prop="Name" label="昵称:   ">
                  <el-input v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item prop="UserName" label="用户名:   ">
                  <span>{{form.UserName}}</span>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-bottom:83px" @click="save('form')">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import CenterMenu from "@/components/CenterMenu";
  import {mapActions} from "vuex";
  import {getInfo, picture} from "../../../../api/user";

  export default {
    name: "UserDetails",
    components: {
      CenterMenu
    },
    data() {
      var validateNick = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'))
        } else if (value.length < 2 || value.length > 10) {
          callback(new Error('昵称长度需在2到10之间'))
        }
        callback()
      }
      return {
        param:"",
        form: {
          UserId: '',
          Name: '',
          UserName: '',
          HeadImg:''
        },
        rules: {
          Name: [{ validator: validateNick, trigger: 'blur' }],
        }
      }
    },
    beforeMount() {
      this.fetchData()
    },
    methods: {
      ...mapActions(['setBuyer']),
      async fetchData(){
        const data=await getInfo({userid:window.sessionStorage.getItem('userid')})
        this.form = data.data[0]
        console.log(this.form)
      },
      beforeUpload(file) {
        const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isPNG) {
          this.$message.error('上传头像图片只能是 PNG/JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        var windowURL = window.URL || window.webkitURL;
        this.form.HeadImg=windowURL.createObjectURL(file);
        //重新写一个表单上传的方法
        this.param = new FormData();
        this.param.append('file', file, file.name);
        return false;
      },
      save(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return
          }
          var name = this.form.Name;
          var userid=this.form.UserId
          this.param.append('data', [userid,name]);
          const data=await picture(this.param)
          if(data.code=200){
            this.$baseMessage(data.msg,'success')
            this.setBuyer(this.form)
            console.log(this.$store.getters.getBuyer)
          }else {
            this.$baseMessage(data.msg,'error')
            this.fetchData()
          }
        })
      }
    },
  }
</script>

<style>
  .user-details-layout {
    max-width: 1225px;
    margin: 0 auto;
  }
  .user-details-content {
    background-color: #ffffff;
    margin-bottom: 30px;
  }
  .user-details-title {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .user-details-title p {
    font-size: 30px;
    color: #757575;
    margin-left: 50px;
  }
  .user-details-form {
    width: 500px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #ff6700;
  }

  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    border-radius: 50%;
    display: block;
  }
  .extra {
    height: 10px;
  }
</style>