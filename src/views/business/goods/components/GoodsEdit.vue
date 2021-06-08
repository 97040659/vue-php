<template>
  <el-dialog
      title="编辑表单"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="handleClose">
    <el-form ref="editForm" :model="editForm" label-width="80px">
      <el-form-item label="商品名称" prop="GoodsName">
        <el-input v-model="editForm.GoodsName"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="Price">
        <el-input v-model="editForm.Price"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="Num">
        <el-input v-model="editForm.Num"></el-input>
      </el-form-item>
      <el-form-item label="样式" prop="Style">
        <el-input v-model="editForm.Style"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="CategoryId">
        <el-select v-model="editForm.CategoryId">
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
          <img v-if="editForm.GoodsImg" :src="editForm.GoodsImg" class="avatar"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">点击上传头像,只能上传png/jpg文件，且不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述" prop="GoodsInfo">
        <el-input type="textarea" v-model="editForm.GoodsInfo"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {saveGoods} from "@/api/goods";
  import {getCategory} from "@/api/category";

  export default {
    name: "GoodsEdit",
    data(){
      return{
        param:'',
        editDialogVisible:false,
        editForm:{
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
      async handleShow(row){
        const data=await getCategory()
        this.category=data.data
        this.editForm=row
        this.editDialogVisible=true
      },
      handleClose(){
        this.$refs['editForm'].resetFields()
        this.editForm = this.$options.data().editForm
        this.editDialogVisible = false
        this.$emit('fetch-data')
      },
      beforeUpload(file) {
        var windowURL = window.URL || window.webkitURL;
        this.editForm.GoodsImg=windowURL.createObjectURL(file);
        //重新写一个表单上传的方法
        this.param = new FormData();
        this.param.append('file', file, file.name);
        return false;
      },
      async editSave(formName){
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return
          }
          console.log(this.param)
          if(this.param!=''){
            this.param.append('GoodsId', this.editForm.GoodsId);
            this.param.append('CategoryId', this.editForm.CategoryId);
            this.param.append('GoodsName', this.editForm.GoodsName);
            this.param.append('Price', this.editForm.Price);
            this.param.append('Num', this.editForm.Num);
            this.param.append('Style', this.editForm.Style);
            this.param.append('GoodsInfo', this.editForm.GoodsInfo);
            this.param.append('GoodsImg', this.editForm.GoodsImg);
            this.param.append('BusinessesId', this.editForm.BusinessesId);
          }else {
           this.param=this.editForm
          }
          const data=await saveGoods(this.param)
          if(data.code===200){
            this.$emit('fetch-data')
            this.editDialogVisible=false
            this.editForm = this.$options.data().editForm
            this.$baseMessage(data.msg,'success')
          }else {
            this.editForm = this.$options.data().editForm
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