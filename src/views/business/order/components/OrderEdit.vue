<template>
  <el-dialog
      title="编辑表单"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="handleClose">
    <el-form ref="editForm" :model="editForm" label-width="80px">
      <el-form-item label="订单编号" prop="OrderId">
        <el-input v-model="editForm.OrderId" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="GoodsImg">
        <img v-if="editForm.GoodsImg" :src="editForm.GoodsImg" class="avatar"/>
      </el-form-item>
      <el-form-item label="商品名称" prop="GoodsName">
        <el-select v-model="editForm.GoodsName" @change="handleChange">
          <el-option
              v-for="item in goods"
              :key="item.GoodsId"
              :label="item.GoodsName"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="Price">
        <el-input v-model="editForm.Price"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="GoodsNum">
        <el-input v-model="editForm.GoodsNum"></el-input>
      </el-form-item>
      <el-form-item label="客户地址" prop="BuyerAddress">
        <el-input v-model="editForm.BuyerAddress"></el-input>
      </el-form-item>
      <el-form-item label="发货地址" prop="BusinessAddress">
        <el-select v-model="editForm.BusinessAddress">
          <el-option
              v-for="item in address"
              :key="item.AddressId"
              :label="item.Address"
              :value="item.AddressId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="Status">
        <el-select v-model="editForm.Status">
          <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {getGoods} from "@/api/goods";
  import {getList} from "@/api/address";
  import {saveOrder} from "@/api/order";

  export default {
    name: "OrderEdit",
    data() {
      return {
        param: '',
        editDialogVisible: false,
        editForm: {
          OrderId: '',
          GoodsId: '',
          GoodsName: '',
          GoodsImg: '',
          Price: '',
          GoodsNum: '',
          Status: '',
          BuyerAddress:'',
          BusinessAddress: '',
          BuyerId:'',
          BusinessesId: '',
        },
        goods: [],
        address: [],
        status: [
          {
            value: 'UnPay',
            label: '等待付款',
          }, {
            value: 'Paid',
            label: '已付款',
          },
          {
            value: 'UnSent',
            label: '等待发货',
          },
          {
            value: 'UnReceive',
            label: '等待签收',
          },
          {
            value: 'Complete',
            label: '交易成功',
          },
          {
            value: 'Appraised',
            label: '已评价',
          },
          {
            value: 'Processing',
            label: '处理中',
          },
          {
            value: 'Invalid',
            label: '无效的'
          },
        ]
      }
    },
    methods: {
      async handleShow(row) {
        const goods = await getGoods()
        const address=await getList({userid:window.sessionStorage.getItem('userid')})
        this.goods = goods.data
        this.address=address.data
        console.log(this.address)
        this.editForm = row
        this.editDialogVisible = true
      },
      handleClose() {
        this.$refs['editForm'].resetFields()
        this.editForm = this.$options.data().editForm
        this.editDialogVisible = false
        this.$emit('fetch-data')
      },
      handleChange(val){
        this.editForm.GoodsId=val.GoodsId
        this.editForm.GoodsName=val.GoodsName
        this.editForm.GoodsImg=val.GoodsImg
        this.editForm.Price=val.Price
      },
      async editSave(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return
          }
          console.log(this.editForm)
          const data = await saveOrder(this.editForm)
          if (data.code === 200) {
            this.$emit('fetch-data')
            this.editDialogVisible = false
            this.editForm = this.$options.data().editForm
            this.$baseMessage(data.msg, 'success')
          } else {
            this.editForm = this.$options.data().editForm
            this.$baseMessage(data.msg, 'error')
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