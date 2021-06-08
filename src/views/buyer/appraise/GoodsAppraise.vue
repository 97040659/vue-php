<template>
  <div class="goods-appraise" v-if="appraise.length>0">
    <el-card class="appraise-list" v-for="(item,index) in appraise" :key="index" shadow="hover">
      <div slot="header" class="appraise-list-head">
        <div class="user-avator" style="float: left">
          <img :src="item.HeadImg" />
        </div>
        <span style="float: left;margin-left: 30px">{{item.Name}}</span>
      </div>
      <div class="appraise-list-content">
        <p>{{item.Content}}</p>
      </div>
        <span class="appraise-list-like"
              :class="{active:item.isLike===true}"
              @click="handleLike(item,index)">
          <i class="el-icon-star-on"></i>
          {{item.Like}}
        </span>
      <i class="el-icon-chat-dot-round"></i>
    </el-card>
    <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50,100]"
          :page-size="param.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getList,giveLike} from "@/api/appraise";

  export default {
    name: "GoodsAppraise",
    data(){
      return{
        appraise:[],
        productID:0,
        total: 0,
        param: {
          id: '', //传入的id
          page: 1, //分页，即第几页的数据
          limit: 10 //每页条数，即每页的数据数
        },
      }
    },
    activated() {
      this.total = 0 // 初始化商品总量为0
      this.param.page = 1 //初始化当前页码为1
      if (this.$route.query.productID != undefined) {
        this.productID = this.$route.query.productID
      }
    },
    watch: {
      // 监听商品id的变化，请求后端获取商品数据
      productID: function() {
        this.param.id=this.productID
        console.log(this.param)
        this.fetchData()
      },
    },
    methods:{
      async fetchData(){
        const data= await getList(this.param)
        this.appraise=data.data
      },
      handleSizeChange(val) {
        this.param.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.param.page = val
        this.fetchData()
      },
      handleLike(val,key){
        if(!val.isLike){
          this.appraise[key].isLike=true
          this.appraise[key].Like+=1
        }else {
          this.appraise[key].isLike=!this.appraise[key].isLike
          if(this.appraise[key].isLike===true){
            this.appraise[key].Like+=1
          }else {
            this.appraise[key].Like-=1
          }
        }
        console.log(this.appraise[key].Like)
      }
    }
  }
</script>

<style scoped>
  .appraise-list {
    margin: 5px 20px;
  }
  .appraise-list-head {
    height: 38px;
    line-height: 38px;
    width: 100%;
    margin: 0 auto;
  }
  .appraise-list-content{
    height: 52px;
    line-height: 38px;
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
    display: flex;
    align-items: center;
  }
  .appraise-list-like{
    float: right;margin-bottom: 5px;
  }
  .active {
    color: red;
  }
</style>