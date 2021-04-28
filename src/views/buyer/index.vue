<!--
 * @Descripttion: 首页
-->

<template>
  <div>
    <!--  <div class="home" id="home" name="home">-->
    <!--    &lt;!&ndash; 轮播图 &ndash;&gt;-->
    <!--    <div class="block">-->
    <!--      <el-carousel height="460px">-->
    <!--        <el-carousel-item v-for="item in carousels" :key="item.id">-->
    <!--          <router-link :to="{ path: '/goods/details', query: {productID:item.productid} }">-->
    <!--            <img style="height:460px;" v-lazy="item.img" />-->
    <!--          </router-link>-->
    <!--        </el-carousel-item>-->
    <!--      </el-carousel>-->
    <!--    </div>-->
    <!--  </div>-->
    <h2>ovo</h2>
    <el-link
        type="primary"
        href="/test"
        style="float:right;margin-bottom:10px;"
    >测试
    </el-link>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        carousels: '', // 轮播图数据
      }
    },
    activated() {
      // 获取首页数据
      this.load()
    },
    methods: {
      load() {

      },
    }
  }
</script>
<style scoped>
  @import "/assets/css/index.css";
</style>