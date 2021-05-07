<template>
  <div class="shoppingCart">
    <!-- 购物车头部 -->
    <div class="top-header">
      <div class="cart-header">
        <!--        <div class="logo">-->
        <!--          <router-link to="/buyer">-->
        <!--            <img src="" alt/>-->
        <!--          </router-link>-->
        <!--        </div>-->
        <div class="cart-header-content">
          <p>我的购物车</p>
          <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
        <div class="cart-header-right">
          <div class="cart-header-order">
            <router-link to="/buyer" class="href">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车头部END -->

    <!-- 购物车主要内容区 -->
    <div class="cart-content" v-if="getShoppingCart.length>0">
      <!--      <ul>-->
      <!--        &lt;!&ndash; 购物车表头 &ndash;&gt;-->
      <!--        <li class="content-header">-->
      <!--          <div class="pro-check">-->
      <!--            <el-checkbox v-model="isAllCheck">全选</el-checkbox>-->
      <!--          </div>-->
      <!--          <div class="pro-img"></div>-->
      <!--          <div class="pro-name">商品名称</div>-->
      <!--          <div class="pro-price">单价</div>-->
      <!--          <div class="pro-num">数量</div>-->
      <!--          <div class="pro-total">小计</div>-->
      <!--          <div class="pro-action">操作</div>-->
      <!--        </li>-->
      <!--        &lt;!&ndash; 购物车表头END &ndash;&gt;-->

      <!--        &lt;!&ndash; 购物车列表 &ndash;&gt;-->
      <!--        <li class="product-list" v-for="(item,index) in getShoppingCart" :key="item.id">-->
      <!--          <div class="pro-check">-->
      <!--            <el-checkbox :value="item.check" @change="checkChange($event,index)"></el-checkbox>-->
      <!--          </div>-->
      <!--          <div class="pro-img">-->
      <!--            <router-link :to="{ path: '/goods/details', query: {productID:item.GoodsId} }">-->
      <!--              <img :src="item.GoodsImg"/>-->
      <!--            </router-link>-->
      <!--          </div>-->
      <!--          <div class="pro-name">-->
      <!--            <router-link-->
      <!--                :to="{ path: '/goods/details', query: {productID:item.GoodsId} }"-->
      <!--            >{{item.Name}}-->
      <!--            </router-link>-->
      <!--          </div>-->
      <!--          <div class="pro-price">{{item.Price}}元</div>-->
      <!--          <div class="pro-num">-->
      <!--            <el-input-number-->
      <!--                size="small"-->
      <!--                :value="item.Num"-->
      <!--                @change="handleChange($event,index,item.GoodsId)"-->
      <!--                :min="1"-->
      <!--                :max="item.MaxNum"-->
      <!--            ></el-input-number>-->
      <!--          </div>-->
      <!--          <div class="pro-total pro-total-in">{{item.Price*item.Num}}元</div>-->
      <!--          <div class="pro-action">-->
      <!--            <el-popover placement="right">-->
      <!--              <p>确定删除吗？</p>-->
      <!--              <div style="text-align: right; margin: 10px 0 0">-->
      <!--                <el-button-->
      <!--                    type="primary"-->
      <!--                    size="mini"-->
      <!--                    @click="deleteItem($event,item.id,item.product_id)"-->
      <!--                >确定-->
      <!--                </el-button>-->
      <!--              </div>-->
      <!--              <i class="el-icon-error" slot="reference" style="font-size: 18px"></i>-->
      <!--            </el-popover>-->
      <!--          </div>-->
      <!--        </li>-->
      <!--        &lt;!&ndash; 购物车列表END &ndash;&gt;-->
      <!--      </ul>-->
      <el-card class="box-card">
        <el-table
            ref="cart"
            :data="list"
            :height="height"
            @selection-change="setSelectRows"
        >
          <el-table-column
              show-overflow-tooltip
              type="selection"
              width="55"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="商品">
            <template #default="{ row }">
              <el-image
                  :preview-src-list="imageList"
                  :src="row.GoodsImg"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              label="名字"
              prop="GoodsName"
              width="95">
          </el-table-column>
          <el-table-column show-overflow-tooltip label="数量">
            <template slot-scope="scope">
              <el-input-number
                  size="small"
                  :value="scope.row.Num"
                  @change="handleChange($event,scope.$index)"
                  :min="1"
                  :max="scope.row.MaxNum"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              label="单价"
              prop="Price"
          ></el-table-column>
          <el-table-column show-overflow-tooltip label="小计">
            <template #default="{ row }">
              {{row.Price*row.Num}}元
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="操作">
            <template slot-scope="scope">
              <i icon="el-icon-circle-close" @click="deleteItem(scope.rows,scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- 购物车底部导航条 -->
        <div class="cart-bar">
          <div class="cart-bar-left">
          <span>
            <router-link to="/goods">继续购物</router-link>
          </span>
            <span class="sep">|</span>
            <span class="cart-total">
            共
            <span class="cart-total-num">{{getNum}}</span> 件商品，已选择
            <span class="cart-total-num">{{getCheckNum}}</span> 件
          </span>
          </div>
          <div class="cart-bar-right">
          <span>
            <span class="total-price-title">合计：</span>
            <span class="total-price">{{getTotalPrice}}元</span>
          </span>
            <router-link :to="getCheckNum > 0 ? '/confirmOrder' : ''">
              <div :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'">去结算</div>
            </router-link>
          </div>
        </div>
      </el-card>
      <!-- 购物车底部导航条END -->
    </div>
    <!-- 购物车主要内容区END -->

    <!-- 购物车为空的时候显示的内容 -->
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>

<script>
  import {saveCart} from "@/api/cart";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "Cart",
    inject:['reload'],
    data() {
      return {
        list: [],
        imageList: [],
        selectRows: '',
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters([
        'getShoppingCart',
        'getCheckNum',
        'getTotalPrice',
        'getNum'
      ]),
      height: function () {
        return document.documentElement.clientHeight
      }
      // isAllCheck: {
      //   get() {
      //     return this.$store.getters.getIsAllCheck
      //   },
      //   set(val) {
      //     this.checkAll(val)
      //   }
      // }
    },
    methods: {
      ...mapActions(['updateShoppingCart', 'deleteShoppingCart', 'checkAll']),
      async fetchData() {
        this.list = this.$store.getters.getShoppingCart
        // this.list.map((item,index)=>{
        //   this.$set(item,'Num',1)
        // })
        this.toggleSelection(this.list)
      },
      setSelectRows(val) {
        this.selectRows = val
        this.updateShoppingCart({key: val, prop: 'check', val: true})
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            if(row.check!==false){
            this.$nextTick().then(function () {
            this.$refs['cart'].toggleRowSelection(row);})
            }
          });
        } else {
          this.$refs['cart'].clearSelection();
        }
      },
      handleChange(val,key) {
        // 当修改数量时，默认勾选
        // console.log(key)
        // console.log(val)
        this.list[key].Num=val
        this.updateShoppingCart({key: key, prop: 'Num', val: val})
      },
      // 向后端发起删除购物车的数据库信息请求
      deleteItem(val,key) {
        this.list.splice(key,1)
        this.deleteShoppingCart(val.GoodsId)
        if(!this.list){
          this.reload()
        }
      },
    },
  }
</script>

<style scoped>
  .shoppingCart {
    background-color: #f5f5f5;
    padding-bottom: 80px;
  }

  /* 购物车头部CSS */
  .shoppingCart .top-header {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 30px;
    border-bottom: 2px solid #ff6700;
  }

  .shoppingCart .top-header .cart-header {
    display: flex;
    height: 100px;
    background-color: #ffffff;
    width: 1225px;
    margin: 0 auto;
    position: relative;
  }

  .shoppingCart .top-header .cart-header .logo {
    height: 60px;
    width: 100px;
    margin-top: 22px;
    margin-right: 20px;
  }

  .shoppingCart .top-header .cart-header .logo img {
    height: 60px;
  }

  .shoppingCart .top-header .cart-header p {
    margin-top: 23px;
    font-size: 28px;
    line-height: 58px;
    float: left;
    font-weight: normal;
    color: #424242;
  }

  .shoppingCart .top-header .cart-header .cart-header-content span {
    color: #757575;
    font-size: 12px;
    float: left;
    height: 20px;
    line-height: 20px;
    margin-top: 48px;
    margin-left: 15px;
  }

  .shoppingCart .top-header .cart-header .cart-header-right {
    display: flex;
    position: absolute;
    right: 0px;
    float: right;
  }

  .shoppingCart .top-header .cart-header .cart-header-select {
    margin-top: 40px;
  }

  .shoppingCart .top-header .cart-header .cart-header-select .href {
    font-size: 13px;
    color: #757575;
  }

  .shoppingCart .top-header .cart-header .cart-header-select .href:hover {
    color: #ff6700;
  }

  .dropdown-menu:hover {
    color: #ff6700;
    background-color: #f5f5f5;
  }

  .shoppingCart .top-header .cart-header .cart-header-order {
    margin-top: 40px;
  }

  .shoppingCart .top-header .cart-header .cart-header-order span {
    color: #c9c7c7;
    margin-left: 20px;
    margin-right: 20px;
  }

  .shoppingCart .top-header .cart-header .cart-header-order .href {
    font-size: 13px;
    color: #757575;
  }

  .shoppingCart .top-header .cart-header .cart-header-order .href:hover {
    color: #ff6700;
  }

  /* 购物车头部CSS END */

  /* 购物车主要内容区CSS */
  .shoppingCart .cart-content {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
  }

  .shoppingCart .cart-content ul {
    background-color: #fff;
    color: #424242;
    line-height: 85px;
  }

  /* 购物车表头及CSS */
  .shoppingCart .cart-content ul .content-header {
    height: 60px;
    padding-right: 26px;
    color: #424242;
    display: flex;
    align-items: center;
  }

  .shoppingCart .cart-content ul .product-list {
    height: 85px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;
  }

  .shoppingCart .cart-content ul .pro-check {
    float: left;
    height: 85px;
    width: 110px;
  }

  .shoppingCart .cart-content ul .pro-check .el-checkbox {
    font-size: 16px;
    margin-left: 24px;
  }

  .shoppingCart .cart-content ul .pro-img {
    float: left;
    height: 85px;
    width: 120px;
  }

  .shoppingCart .cart-content ul .pro-img img {
    height: 80px;
    width: 80px;
  }

  .shoppingCart .cart-content ul .pro-name {
    float: left;
    width: 380px;
  }

  .shoppingCart .cart-content ul .pro-name a {
    color: #424242;
  }

  .shoppingCart .cart-content ul .pro-name a:hover {
    color: #ff6700;
  }

  .shoppingCart .cart-content ul .pro-price {
    float: left;
    width: 140px;
    padding-right: 18px;
    text-align: center;
  }

  .shoppingCart .cart-content ul .pro-num {
    float: left;
    width: 150px;
    text-align: center;
  }

  .shoppingCart .cart-content ul .pro-total {
    float: left;
    width: 120px;
    padding-right: 81px;
    text-align: right;
  }

  .shoppingCart .cart-content ul .pro-total-in {
    color: #ff6700;
  }

  .shoppingCart .cart-content ul .pro-action {
    float: left;
    width: 80px;
    text-align: center;
  }

  .shoppingCart .cart-content ul .pro-action i:hover {
    color: #ff6700;
  }

  /* 购物车表头及CSS END */

  /* 购物车底部导航条CSS */
  .shoppingCart .cart-bar {
    width: 1225px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    margin-bottom: 150px;
  }

  .shoppingCart .cart-bar .cart-bar-left {
    float: left;
  }

  .shoppingCart .cart-bar .cart-bar-left a {
    line-height: 50px;
    margin-left: 32px;
    color: #757575;
  }

  .shoppingCart .cart-bar .cart-bar-left a:hover {
    color: #ff6700;
  }

  .shoppingCart .cart-bar .cart-bar-left .sep {
    color: #eee;
    margin: 0 20px;
  }

  .shoppingCart .cart-bar .cart-bar-left .cart-total {
    color: #757575;
  }

  .shoppingCart .cart-bar .cart-bar-left .cart-total-num {
    color: #ff6700;
  }

  .shoppingCart .cart-bar .cart-bar-right {
    float: right;
  }

  .shoppingCart .cart-bar .cart-bar-right .total-price-title {
    color: #ff6700;
    font-size: 14px;
  }

  .shoppingCart .cart-bar .cart-bar-right .total-price {
    color: #ff6700;
    font-size: 30px;
  }

  .shoppingCart .cart-bar .cart-bar-right .btn-primary {
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #ff6700;
    color: #fff;
  }

  .shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #e0e0e0;
    color: #b0b0b0;
  }

  .shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
    background-color: #f25807;
  }

  /* 购物车底部导航条CSS END */
  /* 购物车主要内容区CSS END */

  /* 购物车为空的时候显示的内容CSS */
  .shoppingCart .cart-empty {
    width: 1225px;
    margin: 0 auto;
  }

  .shoppingCart .cart-empty .empty {
    height: 300px;
    padding: 0 0 130px 558px;
    margin: 65px 0 0;
    background: url(~@/assets/imgs/cart-empty.png) no-repeat 124px 0;
    color: #b0b0b0;
    overflow: hidden;
  }

  .shoppingCart .cart-empty .empty h2 {
    margin: 70px 0 15px;
    font-size: 36px;
  }

  .shoppingCart .cart-empty .empty p {
    margin: 0 0 20px;
    font-size: 20px;
  }

  /* 购物车为空的时候显示的内容CSS END */
</style>