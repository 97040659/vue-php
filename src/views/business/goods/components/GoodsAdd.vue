<template>
  <el-dialog
      title="添加表单"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="handleClose">
    <el-form ref="addForm" :model="addForm" label-width="80px">
      <el-form-item label="商品名称" prop="GoodsName">
        <el-input v-model="addForm.GoodsName"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="Price">
        <el-input v-model="addForm.Price"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="Num">
        <el-input v-model="addForm.Num"></el-input>
      </el-form-item>
      <el-form-item label="样式" prop="Style">
        <el-input v-model="addForm.Style"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="CategoryId">
        <el-select v-model="addForm.CategoryId">
          <el-option
              v-for="item in category"
              :key="item.CategoryId"
              :label="item.Name"
              :value="item.CategoryId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="GoodsImg">
        <el-upload
            class="avatar-uploader"
            ref="upload"
            action="http://www.phpdemo.com/api/Goods/saveGoods"
            :headers="{'Content-Type':'multipart/form-data'}"
            :before-upload="beforeUpload"
            :show-file-list="false"
            accept="image/png, image/jpeg"
        >
          <img v-if="addForm.GoodsImg" :src="addForm.GoodsImg" class="avatar"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">点击上传头像,只能上传png/jpg文件，且不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述" prop="GoodsInfo">
        <el-input type="textarea" v-model="addForm.GoodsInfo"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSave('addForm')">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {saveGoods} from "@/api/goods";
  import {getCategory} from "@/api/category";

  export default {
    name: "GoodsAdd",
    data(){
      return{
        param:'',
        addDialogVisible:false,
        addForm:{
          GoodsId:'',
          CategoryId: '',
          GoodsName: '',
          Price: '',
          Num: '',
          Style: '',
          GoodsInfo:'',
          GoodsImg: '',
          BusinessesId: '',
        },
        category:[]
      }
    },
    methods:{
      async handleShow(){
        const data=await getCategory()
        this.category=data.data
        this.addDialogVisible=true
      },
      handleClose(){
        this.$refs['addForm'].resetFields()
        this.addForm = this.$options.data().addForm
        this.addDialogVisible = false
        this.$emit('fetch-data')
      },
      beforeUpload(file) {
        var windowURL = window.URL || window.webkitURL;
        this.addForm.GoodsImg=windowURL.createObjectURL(file);
        //重新写一个表单上传的方法
        this.param = new FormData();
        this.param.append('file', file, file.name);
        return false;
      },
      async addSave(formName){
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return
          }
          this.param.append('GoodsId', this.addForm.GoodsId);
          this.param.append('CategoryId', this.addForm.CategoryId);
          this.param.append('GoodsName', this.addForm.GoodsName);
          this.param.append('Price', this.addForm.Price);
          this.param.append('Num', this.addForm.Num);
          this.param.append('Style', this.addForm.Style);
          this.param.append('GoodsInfo', this.addForm.GoodsInfo);
          this.param.append('BusinessesId', window.sessionStorage.getItem('userid'));
          const data=await saveGoods(this.param)
          if(data.code===200){
            this.$emit('fetch-data')
            this.addDialogVisible=false
            this.addForm = this.$options.data().addForm
            this.$baseMessage(data.msg,'success')
          }else {
            this.addForm = this.$options.data().addForm
            this.$baseMessage(data.msg,'error')
          }
        })
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
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
    display: block;
  }
</style>