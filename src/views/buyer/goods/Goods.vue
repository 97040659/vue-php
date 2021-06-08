<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/buyer">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{search}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
              v-for="item in categoryList"
              :key="item.CategoryId"
              :label="item.Name"
              :name="''+item.CategoryId"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <MyList :list="list" v-if="list.length>0"></MyList>
        <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="param.page"
            :page-sizes="[10, 20, 50,100]"
            :page-size="param.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>

<script>
  import {getGoods,updateClick} from "@/api/goods";
  import {getCategory} from "@/api/category";
  import MyList from "@/components/MyList";
  import {mapActions} from "vuex";

  export default {
    name: "Goods",
    components:{
      MyList
    },
    data(){
      return{
        categoryList: '', //分类列表
        categoryID: [], // 分类id
        list: '', // 商品列表
        total: 0, // 商品总量
        param: {
          id:'', //传入的id
          key: '', //关键字
          page: 1, //分页，即第几页的数据
          limit: 10 //每页条数，即每页的数据数
        },
        activeName: '-1', // 分类列表当前选中的id
        search: '', // 搜索条件
      }
    },
    created() {
      this.getCategory()
      this.fetchData()
    },
    beforeUpdate() {
      this.updateClick()
    },
    activated() {
      this.activeName = '-1' // 初始化分类列表当前选中的id为-1
      this.total = 0 // 初始化商品总量为0
      this.param.page = 1 //初始化当前页码为1
      // 如果路由没有传递参数，默认为显示全部商品
      if (Object.keys(this.$route.query).length == 0) {
        this.categoryID = []
        this.activeName = '0'
        return
      }
      // 如果路由传递了categoryID，则显示对应的分类商品
      if (this.$route.query.categoryID != undefined) {
        this.categoryID = this.$route.query.categoryID
        if (this.categoryID.length == 1) {
          this.activeName = '' + this.categoryID[0]
        }else {
          this.fetchData()
        }
        return
      }
      // 如果路由传递了search，则为搜索，显示对应的分类商品
      if (this.$route.query.search != undefined) {
        this.search = this.$route.query.search
      }
    },
    watch: {
      // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
      activeName: function(val) {
        if (val == 0) {
          this.categoryID = []
        }
        if (val > 0) {
          this.categoryID = [Number(val)]
        }
        // 初始化商品总量和当前页码
        this.total = 0
        this.param.page = 1
        // 更新地址栏链接，方便刷新页面可以回到原来的页面
        this.$router.push({
          path: '/goods',
          query: { categoryID: this.categoryID }
        })
      },
      // 监听搜索条件，响应相应的商品
      search: function(val) {
        if (val != '') {
          this.param.key=val
          this.fetchData()
        }
      },
      // 监听分类id，响应相应的商品
      categoryID: function(val) {
        if (val != []) {
          this.search = ''
          this.param.id = Number(val)
          this.fetchData()
        }
      },
      // 监听路由变化，更新路由传递了搜索条件
      $route: function(val) {
        if (val.path == '/goods') {
          if (val.query.search != undefined) {
            this.activeName = '-1'
            this.param.page = 1
            this.total = 0
            this.search = val.query.search
          }
        }
      }
    },
    methods:{
      async fetchData() {
        console.log(this.param)
        const data = await getGoods(this.param)
        this.list = data.data
        this.total = data.total
      },
      async getCategory(){
        const data=await getCategory()
        const val = {
          CategoryId: 0,
          Name: '全部'
        }
        const cate = data.data
        cate.unshift(val)
        this.categoryList=cate
      },
      async updateClick(){
        const click=this.$store.getters.getClick
        for (let i=0;i<click.length;i++){
          await updateClick(click[i])
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
    }
  }
</script>

<style scoped>
  .goods {
    background-color: #f2f2f2;
  }
  /* 面包屑CSS */
  .el-tabs--card .el-tabs__header {
    border-bottom: none;
  }
  .goods .breadcrumb {
    height: 50px;
    background-color: #f2f2f2;
  }
  .goods .breadcrumb .el-breadcrumb {
    width: 1225px;
    line-height: 30px;
    font-size: 16px;
    margin: 0 auto;
  }
  /* 面包屑CSS END */

  /* 分类标签CSS */
  .goods .nav {
    background-color: #f2f2f2;
  }
  .goods .nav .product-nav {
    width: 1225px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
  }
  .nav .product-nav .title {
    width: 50px;
    font-size: 16px;
    font-weight: 700;
    float: left;
  }
  /* 分类标签CSS END */

  /* 主要内容区CSS */
  .goods .main {
    margin: 0 auto;
    max-width: 1225px;
  }
  .goods .main .list {
    min-height: 650px;
    padding-top: 14.5px;
    margin-left: -13.7px;
    overflow: auto;
  }
  .goods .main .pagination {
    height: 50px;
    text-align: center;
  }
  .goods .main .none-product {
    color: #333;
    margin-left: 13.7px;
  }
</style>