<!--
 * @Descripttion: 首页
-->

<template>
  <div>
      <div class="home" id="home" name="home">
        <!-- 轮播图 -->
        <div class="block">
          <el-carousel height="460px" :interval="5000">
            <el-carousel-item v-for="item in carousels" :key="item.GoodsId">
              <router-link :to="{ path: '/goods/details', query: {productID:item.GoodsId} }">
                <el-image style="height:460px;text-align: center" fit="cover" :src="item.GoodsImg" />
              </router-link>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
  </div>
</template>
<script>

  import {getCarousels} from "@/api/goods";

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
      async load() {
        const data=await getCarousels({userid:window.sessionStorage.getItem('userid')})
        this.carousels=data.data
      },
    }
  }
</script>
<style scoped>
  @import "/assets/css/index.css";
</style>