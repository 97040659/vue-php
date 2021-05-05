<template>
  <div id="details" v-if="productDetails">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
        <p>{{ productDetails.name }}</p>
        <div class="list">
          <div class="select">
            <el-button type="text" class="list-select" @click="goInfo">概述</el-button>
          </div>
          <span class="cut">|</span>
          <div class="select">
            <el-button type="text" class="list-select" @click="goParam">参数</el-button>
          </div>
          <span class="cut">|</span>
          <div class="select">
            <el-button type="text" class="list-select">用户评价</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="details-main">
      <!-- 左侧商品轮播图 -->
      <div class="details-block">
        <el-carousel height="560px" v-if="productPictures.length > 1">
          <el-carousel-item v-for="item in productPictures" :key="item.id">
            <img style="height: 560px;" v-lazy="item.img_path" />
          </el-carousel-item>
        </el-carousel>
        <div v-if="productPictures.length == 1">
          <img style="height: 560px;" :src="productPictures[0].img_path" />
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="details-content">
        <h1 class="name">{{ productDetails.name }}</h1>
        <li class="view">
          <i class="el-icon-view"></i>
          {{ productDetails.view }}
        </li>
        <p class="intro">{{ productDetails.info }}</p>
        <div class="price">
          <span>{{ productDetails.discount_price }}元</span>
          <span
              v-show="productDetails.price != productDetails.discount_price"
              class="del"
          >{{ productDetails.price }}元</span>
        </div>
        <div class="pro-list">
          <p class="price-sum">总计 : {{ productDetails.discount_price }}元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
          <el-button class="like" @click="addFavorite">喜欢</el-button>
        </div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
    <div class="product-select" id="product-select">
      <el-button
          type="text"
          :class="select == 0 ? 'isSelect' : 'notSelect'"
          @click="showInfoImgs"
      >商品概述</el-button>
      <span class="cut">|</span>
      <el-button
          type="text"
          :class="select == 1 ? 'isSelect' : 'notSelect'"
          @click="showParamImgs"
      >商品参数</el-button>
    </div>
    <div class="product-img" v-for="item in imgs" :key="item.id">
      <img v-lazy="item.img_path" />
    </div>
  </div>
  <div class="not-found" v-else>查询不到该商品</div>
</template>

<script>
  import {saveCart} from "@/api/cart";
  import {saveFavorite} from "@/api/favorite";
  import {getInfo} from "@/api/goods";

  export default {
    name: "Details",
    data() {
      return {
        dis: false, // 控制“加入购物车按钮是否可用”
        productID: 0, // 商品id
        product: '', // 商品详细信息
        select: 0
      }
    },
    // 通过路由获取商品id
    activated() {
      if (this.$route.query.productID != undefined) {
        this.productID = this.$route.query.productID
      }
    },
    watch: {
      // 监听商品id的变化，请求后端获取商品数据
      productID: function() {
        this.load()
        //this.getDetailsPicture(val);
      }
    },
    methods: {
      ...mapActions(['addShoppingCart','setClick']),
      // 获取商品详细信息
      async fetchData() {
        const goods={
          GoodsId: this.productID
        }
        const data=await getInfo(goods)
        this.product=data.data
        this.setClick({GoodsId:this.product.GoodsId,Click:this.product.Click++})
      },
      // 加入购物车
      async addShoppingCart() {
        var form = {
          UserId: this.$store.getters.getBuyer.UserId,
          GoodsId: Number(this.productID),
          Num:this.product.Num,
          Price:this.product.Price
        }
        const data=await saveCart(form)
        this.addShoppingCart(form)
      },
      async addFavorite() {
        var form = {
          userid: this.$store.getters.getBuyer.UserId,
          GoodsId: Number(this.productID)
        }
        const data =await saveFavorite(form)
      }
    },
  }
</script>

<style scoped>
  /* 头部CSS */
  #details .page-header {
    height: 64px;
    margin-top: -20px;
    z-index: 4;
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  }
  #details .page-header .title {
    width: 1225px;
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: 400;
    color: #212121;
    margin: 0 auto;
  }
  #details .page-header .title p {
    float: left;
  }
  #details .page-header .title .list {
    height: 64px;
    float: right;
    display: flex;
    align-items: center;
  }
  #details .page-header .title .list .select {
    float: left;
    margin-left: 20px;
  }

  #details .page-header .title .list .select .list-select {
    font-size: 14px;
    color: #616161;
  }
  #details .page-header .title .list .select .list-select:hover {
    font-size: 14px;
    color: #ff6700;
  }
  #details .page-header .title .list .cut {
    font-size: 17px;
    color: #c9c7c7;
    margin-left: 20px;
  }
  /* 头部CSS END */

  /* 主要内容CSS */
  #details .details-main {
    width: 1225px;
    height: 560px;
    padding-top: 30px;
    margin: 0 auto;
    padding-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
  }
  #details .details-main .details-block {
    float: left;
    width: 560px;
    height: 560px;
  }
  #details .el-carousel .el-carousel__indicator .el-carousel__button {
    background-color: rgba(163, 163, 163, 0.8);
  }
  #details .details-main .details-content {
    float: left;
    margin-left: 25px;
    width: 640px;
  }

  #details .details-main .details-content .name {
    line-height: 30px;
    font-size: 24px;
    font-weight: normal;
    color: #212121;
    display: inline;
  }

  #details .details-main .details-content .view {
    color: #b0b0b0;
    float: right;
    padding-top: 5px;
    font-size: 18px;
  }

  #details .details-main .details-content .intro {
    color: #b0b0b0;
    padding-top: 10px;
  }
  #details .details-main .details-content .store {
    color: #ff6700;
    padding-top: 10px;
  }
  #details .details-main .details-content .price {
    display: block;
    font-size: 18px;
    color: #ff6700;
    border-bottom: 1px solid #e0e0e0;
    padding: 25px 0 25px;
  }
  #details .details-main .details-content .price .del {
    font-size: 14px;
    margin-left: 10px;
    color: #b0b0b0;
    text-decoration: line-through;
  }
  #details .details-main .details-content .pro-list {
    background: #f9f9f9;
    padding: 30px 60px;
    margin: 50px 0 50px;
  }
  #details .details-main .details-content .pro-list span {
    line-height: 30px;
    color: #616161;
  }
  #details .details-main .details-content .pro-list .pro-price {
    float: right;
  }
  #details .details-main .details-content .pro-list .pro-price .pro-del {
    margin-left: 10px;
    text-decoration: line-through;
  }
  #details .details-main .details-content .pro-list .price-sum {
    color: #ff6700;
    font-size: 24px;
    padding-top: 20px;
  }
  #details .details-main .details-content .button {
    height: 55px;
    margin: 10px 0 20px 0;
  }
  #details .details-main .details-content .button .el-button {
    float: left;
    height: 55px;
    font-size: 16px;
    color: #fff;
    border: none;
    text-align: center;
  }
  #details .details-main .details-content .button .shop-cart {
    width: 340px;
    background-color: #ff6700;
  }
  #details .details-main .details-content .button .shop-cart:hover {
    background-color: #f25807;
  }

  #details .details-main .details-content .button .like {
    width: 260px;
    margin-left: 40px;
    background-color: #b0b0b0;
  }
  #details .details-main .details-content .button .like:hover {
    background-color: #757575;
  }
  #details .details-main .details-content .pro-policy li {
    float: left;
    margin-right: 20px;
    color: #b0b0b0;
  }
  /* 主要内容CSS END */

  /*商品概述&参数*/
  #details .product-select {
    width: 300px;
    margin: 0 auto;
    height: 80px;
    display: flex;
    align-items: center;
  }
  #details .product-select .notSelect {
    font-size: 19px;
    color: #757575;
  }
  #details .product-select .isSelect {
    font-size: 19px;
    color: #ff6700;
  }
  #details .product-select .notSelect:hover {
    color: #ff6700;
  }
  #details .product-select .cut {
    font-size: 25px;
    color: #c9c7c7;
    margin-left: 35px;
    margin-right: 35px;
  }
  #details .product-img img {
    width: 1225px;
    display: block;
    margin: 0 auto;
  }
  /*商品概述&参数END*/

  /*v-else*/
  .not-found {
    height: 500px;
    text-align: center;
    margin-top:100px;
  }
  /*v-else END*/
</style>