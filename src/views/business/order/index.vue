<template>
  <div>
    <el-card class="box-card">
      <el-button type="danger" size="medium" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-input
          placeholder="请输入内容"
          style="width: 300px;margin-left: 20px;"
          v-model="param.key"
          clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
      <!--      表格-->
      <el-table
          ref="form"
          :data="list"
          height="250"
          border
          style="width: 100%;margin-top: 10px">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="OrderId"
            label="订单编号"
            width="120">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="图片">
          <template #default="{ row }">
            <el-image
                :src="row.GoodsImg"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="GoodsName"
            label="商品名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="Price"
            label="价格"
            width="120">
        </el-table-column>
        <el-table-column
            prop="GoodsNum"
            label="数量">
        </el-table-column>
        <el-table-column
            prop="CreateTime"
            label="生成时间">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="订单状态">
          <template #default="{ row }">
            <el-tooltip
                :content="row.Status"
                class="item"
                effect="dark"
                placement="top-start"
            >
              <el-tag>
                {{ row.Status | statusFilter}}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
            <el-button slot="reference" v-if="row.Status=='UnSent'" size="mini" @click="handleDelivery(row)">发货</el-button>
            <el-button v-else-if="row.state=='Processing'" size="mini" @click="handleDeal(row)">处理</el-button>
            <el-button disabled='true' size="mini" v-else-if="row.state=='Complete'">已完成</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="param.page"
          :page-sizes="[10, 20, 50,100]"
          :page-size="param.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
      <!--      编辑的表单-->
      <order-edit ref="edit"></order-edit>
    </el-card>
  </div>
</template>

<script>
  import {getList, dealOrder} from '@/api/order'
  import OrderEdit from "./components/OrderEdit";

  export default {
    name: "index",
    components: {OrderEdit},
    data() {
      return {
        list: [],
        param: {
          key: '', //关键字
          page: 1, //分页，即第几页的数据
          limit: 10//每页条数，即每页的数据数
        },
        total: 0,
        editDialogVisible:false,
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          'UnPay': '等待付款',
          'UnSent': '等待发货',
          'UnReceive': '等待签收',
          'Complete': '交易成功',
          'Appraised':'已评价',
          'Processing':'处理中',
          'Invalid':'无效的'
        }
        return statusMap[status]
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.param.userid=window.sessionStorage.getItem('userid')
        const data = await getList(this.param)
        this.list = data.data
        this.total = data.total
      },
      search() {
        this.fetchData()
      },
      handleSizeChange(val) {
        this.param.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.param.page = val
        this.fetchData()
      },
      handleDelivery(row){
        this.$refs['delivery'].handleShow(row)
      },
      handleDeal(row){
        const data = {id: row.Id,Status:'Invalid'}
        dealOrder(data)
      },
      handleEdit(row) {
        this.$refs['edit'].handleShow(row)
      },
      async handleDelete(row) {
        const data = {
          GoodsId: row.GoodsId
        }
        const res = await deleteGoods(data)
        if (res.code == 200) {
          this.$baseMessage(res.msg, 'success')
          this.fetchData()
        } else {
          this.$baseMessage(res.msg, 'error')
        }
      },
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