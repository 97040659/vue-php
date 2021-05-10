<template>
  <el-form ref="form" :model="form" status-icon label-width="80px">
    <el-form-item label="头像:">
      <el-upload
          class="avatar-uploader"
          ref="upload"
          action="http://www.phpdemo.com/api/Login/picture"
          :headers="{'Content-Type':'multipart/form-data'}"
          :before-upload="beforeUpload"
          :show-file-list="false"
          accept="image/png, image/jpeg"
      >
        <el-avatar v-if="imageUrl" :size="178" :src="imageUrl"></el-avatar>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">点击上传头像,只能上传png/jpg文件，且不超过2M</div>
      </el-upload>
    </el-form-item>
    <el-form-item prop="Name" label="昵称:   ">
      <el-input v-model="form.Name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="margin-bottom:83px" @click="save('form')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {picture} from "@/api/user";

  export default {
    name: "upload",
    data() {
      return {
        imageUrl: '',
        form: {
          UserId: 6,
          Name: '',
          HeadImg: '',
          UserName: ''
        },
      }
    },
    methods: {
      beforeUpload(file) {
        var windowURL = window.URL || window.webkitURL;
        this.imageUrl=windowURL.createObjectURL(file);
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
          var userid='6'
          this.param.append('data', [userid,name]);
          const data=await picture(this.param)
          console.log(data)
        })
      }
    },
    beforeMount() {
      this.form.UserId = this.$store.getters.getBuyer.UserId
      this.form.UserName = this.$store.getters.getBuyer.UserName
      this.form.Name = this.$store.getters.getBuyer.Name
      this.imageUrl = this.$store.getters.getBuyer.HeadImg
    },
  }
</script>
<style>
  .avatar {
    max-width: 180px;
    max-height: 180px;
    border-radius: 50%;
    display: block;
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
</style>