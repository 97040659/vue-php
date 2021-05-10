<template>
  <div class="order" id="order" name="order">
    <div class="order-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="order-content">
            <div class="extra"></div>
            <!--我的订单头部-->
            <div class="order-title">
              <p>我的订单</p>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部订单" name="all"></el-tab-pane>
              <el-tab-pane label="待支付" name="UnPay"></el-tab-pane>
              <el-tab-pane label="已付款" name="Paid"></el-tab-pane>
              <el-tab-pane label="待发货" name="UnSent"></el-tab-pane>
              <el-tab-pane label="待收货" name="UnReceive"></el-tab-pane>
              <el-tab-pane label="已完成" name="Complete"></el-tab-pane>
              <el-tab-pane label="订单回收站" name="Invalid"></el-tab-pane>
              <div class="search">
                <el-input placeholder="输入商品名称、订单号" v-model="search">
                  <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                </el-input>
              </div>
            </el-tabs>
            <div v-if="order.length>0">
              <!--我的订单头部 end-->
              <!--订单列表-->
              <el-card class="order-list" v-for="(item,index) in order" :key="index">
                <div class="order-list-head">
                  <div class="order-pay">{{item.Status | statusFilter}}</div>
                  <div class="order-info">
                    <div style="width:650px;">
                      <span class="info">{{item.CreateTime}}</span>
                      <span class="cut">|</span>
                      <span class="info">订单号：{{item.OrderId}}</span>
                    </div>
                    <span class="info" style="margin-left:30px">应付金额：</span>
                    <span class="money">{{item.Price*item.GoodsNum}}</span>
                    <span class="info">元</span>
                  </div>
                </div>
                <div class="order-list-product">
                  <div class="pro-img">
                    <router-link
                        :to="{ path: '/goods/details', query: {productID:item.GoodsId} }"
                    >
                      <img :src="item.GoodsImg"/>
                    </router-link>
                  </div>
                  <div class="pro-info">
                    <span>
                      <router-link
                          class="info-href"
                          :to="{ path: '/goods/details', query: {productID:item.GoodsId} }"
                      >{{item.GoodsName}}</router-link>
                    </span>
                    <span>{{item.Price}}</span>&nbsp;×
                    <span>{{item.GoodsNum}}</span>
                  </div>
                  <div class="operate">
                    <div v-if="item.Status=='UnPay'">
                      <router-link :to="{ path: '/payment', query: {Id:item.Id} }">
                        <el-button class="button-pay">立即付款</el-button>
                      </router-link>
                    </div>
                    <div>
                      <router-link
                          :to="{ path: '/order/details', query: {Id:item.Id} }"
                      >
                        <el-button plain class="button-detail">订单详情</el-button>
                      </router-link>
                    </div>
                    <div v-if="item.Status!=='Complete'&& item.Status!=='UnPay'">
                      <el-button type="info" class="button-detail" @click="handleCancel(item.Id)">取消订单</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
              <!-- 分页 -->
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
              <div class="extra"></div>
              <div class="extra"></div>
            </div>
            <!-- 分页END -->
            <!-- 订单为空的时候显示的内容 -->
            <div v-else class="empty">
              <p>你暂未购买任何商品</p>
              <p>快去购物吧！</p>
            </div>
            <!-- 订单为空的时候显示的内容END -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import CenterMenu from "../../../../components/CenterMenu";
  import {getList, dealOrder} from "../../../../api/order";
  import {mapGetters} from "vuex";

  export default {
    name: "Order",
    components: {
      CenterMenu
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          'UnPay': '等待付款',
          'Paid': '已付款',
          'UnSent': '等待发货',
          'UnReceive': '等待签收',
          'Complete': '交易成功',
          'invalid':'无效的'
        }
        return statusMap[status]
      },
    },
    computed: {
      ...mapGetters(['getUserId']),
    },
    data() {
      return {
        order: [], // 订单列表
        total: 0,
        search: null,
        param: {
          id: '', //传入的id
          key: '',
          page: 1, //分页，即第几页的数据
          limit: 10 //每页条数，即每页的数据数
        },
        activeName: 'all'
      }
    },
    activated() {
      this.activeName = 'all' // 初始化分类列表当前选中的id为all
      this.total = 0 // 初始化商品总量为0
      this.param.page = 1 //初始化当前页码为1
      if (this.$route.query.activeName != undefined) {
        this.activeName = this.$route.query.activeName
      }
      this.param.activeName = this.activeName
      this.fetchData()
    },
    watch: {
      // 监听订单类型的变化，请求后端获取商品数据
      activeName: function () {
        this.param.activeName = this.activeName
        this.fetchData()
      },
      search: function (val) {
        if (val != '') {
          var reg = /^[0-9]+.?[0-9]*$/;
          // console.log(reg.test(val));
          if (reg.test(val)) {
            this.param.id = val
          } else {
            this.param.key = val
          }
        }
      }
    },
    methods: {
      async fetchData() {
        // 获取订单数据
        this.param.userid = this.getUserId
        console.log(this.param)
        const data = await getList(this.param)
        this.order = data.data
        this.total = data.total
        console.log(data)
      },
      handleSizeChange(val) {
        this.param.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.param.page = val
        this.fetchData()
      },
      handleCancel(val) {
        const data = {Id: val}
        dealOrder(data)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      searchClick() {
        this.fetchData()
      }
    },
  }
</script>

<style scoped>
  .order-layout {
    max-width: 1225px;
    margin: 0 auto;
  }

  .order-content {
    background-color: #ffffff;
    margin-bottom: 30px;
  }

  .order-title {
    height: 100px;
    display: flex;
    align-items: center;
  }

  .order-title p {
    font-size: 30px;
    color: #757575;
    margin-left: 50px;
  }

  .extra {
    height: 10px;
  }

  .order-content .search {
    width: 640px;
  }

  .order-list {
    margin: 20px 0;
  }

  /*订单头部*/
  .order-list-head {
    height: 100px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    /*border-left: 1px solid #ff6700;*/
    /*border-right: 1px solid #ff6700;*/
    /*border-top: 1px solid #ff6700;*/
    border-bottom: 1px solid #feccac;
  }

  .order-list-head .order-pay {
    font-size: 19px;
    color: #ff6700;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .order-list-head .order-success-pay {
    font-size: 19px;
    color: #00a724;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .order-list-head .order-info {
    width: 860px;
    margin: 0 auto;
    margin-top: 5px;
    display: flex;
    align-items: center;
  }

  .order-list-head .order-info .info {
    font-size: 15px;
    color: #757575;
  }

  .order-list-head .order-info .cut {
    font-size: 17px;
    color: #c9c7c7;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 300;
  }

  .order-list-head .order-info .money {
    font-size: 25px;
    color: #000000;
    margin-right: 5px;
    margin-left: 10px;
  }

  /*订单头部END*/
  /*订单商品*/
  .order-list-product {
    height: 130px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    /*border-left: 1px solid #ff6700;*/
    /*border-right: 1px solid #ff6700;*/
    /*border-bottom: 1px solid #ff6700;*/
  }

  .order-list-product .pro-img {
    margin-left: 30px;
    margin-right: 20px;
  }

  .order-list-product .pro-img img {
    height: 80px;
    width: 80px;
  }

  .order-list-product .pro-info {
    width: 60%;
    font-size: 15px;
    color: #333333;
  }

  .order-list-product .pro-info span {
    margin: 0 60px;
  }

  .order-list-product .pro-info .info-href {
    font-size: 15px;
    color: #333333;
  }

  .order-list-product .pro-info .info-href:hover {
    color: #ff6700;
  }

  .order-list-product .operate {
    line-height: 50px;
    margin-left: 50px;
  }

  .order-list-product .operate .button-pay {
    width: 100px;
    color: #ffffff;
    background-color: #ff6700;
  }

  .order-list-product .operate .button-detail {
    width: 100px;
  }

  /*订单商品END*/
  .order-content .pagination {
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .empty {
    width: 200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    color: #bdbaba;
    font-size: 18px;
  }
</style>