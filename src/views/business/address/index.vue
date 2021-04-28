<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="medium" @click="handleAdd">添加</el-button>
      <el-input
          placeholder="请输入内容"
          style="width: 300px;margin-left: 20px;"
          v-model="param.key"
          clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
<!--      表格-->
      <el-table
          :data="list"
          border
          style="width: 100%;margin-top: 10px">
        <el-table-column
            prop="AddressId"
            label="id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="UserId"
            label="用户id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="Address"
            label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--          {{scope.row}}-->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50,100]"
          :page-size="param.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
<!--      添加的表单-->
      <el-dialog
          title="添加表单"
          :visible.sync="addDialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item label="地址" prop="address">
            <el-input v-model="addForm.Address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSave">确 定</el-button>
        </span>
      </el-dialog>
<!--      编辑的表单-->
      <el-dialog
          title="编辑表单"
          :visible.sync="editDialogVisible"
          width="30%">
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="地址">
            <el-input v-model="editForm.Address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSave">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {getList, deleteAddress,save} from '@/api/address'

  export default {
    name: "addressTable",
    data() {
      return {
        list: [{
          AddressId: '',
          UserId: '',
          Address: ''
        }],
        currentPage: 1,
        param: {
          key: '', //关键字
          page: 1, //分页，即第几页的数据
          limit: 10 //每页条数，即每页的数据数
        },
        total: 0,
        addDialogVisible:false,
        editDialogVisible:false,
        addForm:{
          UserId: '',
          Address: ''
        },
        editForm:{
          AddressId: '',
          UserId: '',
          Address: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const data = await getList(this.param)
        this.list = data.data
        console.log(data)
        this.total = data.total
      },
      search() {
        this.fetchData()
      },
      async addSave(){
        //提交数据
        const res=await save(this.addForm)
        console.log(res)
        if(res.code==200){
          this.$baseMessage(res.msg,'success')
          //关闭弹窗
          this.addDialogVisible = false
          //刷新表格
          this.fetchData()
          this.addForm.UserId=''
          this.addForm.Address=''
        }else {
          this.$baseMessage(res.msg,'error')
        }
      },
      async editSave(){
        //提交数据
        const res=await save(this.editForm)
        console.log(res)
        if(res.code==200){
          this.$baseMessage(res.msg,'success')
          //关闭弹窗
          this.editDialogVisible = false
          //刷新表格
          this.fetchData()
          this.editForm.AddressId=''
          this.editForm.UserId=''
          this.editForm.Address=''
        }else {
          this.$baseMessage(res.msg,'error')
        }
      },
      handleSizeChange(val) {
        this.param.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.param.page = val
        this.fetchData()
      },
      handleAdd() {
        this.addDialogVisible=true
        this.addForm.UserId=this.list[0].UserId
      },
      handleEdit(row) {
        console.log(row);
        this.editForm.AddressId=row.AddressId
        this.editForm.UserId=row.UserId
        this.editForm.Address=row.Address
        this.editDialogVisible=true
      },
      async handleDelete(row) {
        const data = {
          AddressId: row.AddressId
        }
        const res = await deleteAddress(data)
        if (res.code == 200) {
          this.$baseMessage(res.msg, 'success')
          this.fetchData()
        } else {
          this.$baseMessage(res.msg, 'error')
        }
      },
      handleClose(val){
        console.log(val)
      }
    }
  }
</script>

<style scoped>

  .box-card {
    width: 100%;
  }

  .el-pagination {
    margin-top: 10px;
  }
</style>