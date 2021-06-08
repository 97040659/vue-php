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
          ref="form"
          :data="list"
          height="250"
          border
          style="width: 100%;margin-top: 10px">
        <el-table-column
            type="selection"
            width="55">
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
            prop="Num"
            label="数量">
        </el-table-column>
        <el-table-column
            prop="Style"
            label="样式">
        </el-table-column>
        <el-table-column
            prop="GoodsInfo"
            label="商品描述">
        </el-table-column>
        <el-table-column
            prop="Click"
            label="浏览数">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
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
      <!--      添加的表单-->
      <goods-add ref="add"></goods-add>
      <!--      编辑的表单-->
      <goods-edit ref="edit"></goods-edit>
    </el-card>
  </div>
</template>

<script>
  import {getList, saveGoods,deleteGoods} from '@/api/goods'
  import GoodsAdd from "./components/GoodsAdd";
  import GoodsEdit from "./components/GoodsEdit";

  export default {
    name: "index",
    components: {GoodsEdit, GoodsAdd},
    data() {
      return {
        list: [],
        param: {
          key: '', //关键字
          page: 1, //分页，即第几页的数据
          limit: 10//每页条数，即每页的数据数
        },
        total: 0,
        addDialogVisible:false,
        editDialogVisible:false,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.param.userid=window.sessionStorage.getItem('userid')
        const data = await getList(this.param)
        this.list = data.data
        console.log(data)
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
      handleAdd() {
        this.$refs['add'].handleShow()
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