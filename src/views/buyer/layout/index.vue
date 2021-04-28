<template>
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="topbar" v-show="$route.meta.showMenu!==false">
        <div class="nav">
          <ul>
            <li class="font">
              <div>
                <router-link to="/">
                  <span class="el-icon-s-home"></span>
                </router-link>
              </div>
            </li>
          </ul>
          <ul>
            <li v-if="!this.$store.getters.getUser">
              <div style="margin-top:5px;font-size:16px">
                <router-link to="/login">登录</router-link>
              </div>
            </li>
            <li v-else class="header-user-con">
              <!-- 用户头像 -->
              <div class="user-avator">
                <img :src="this.$store.getters.getUser.avatar" />
              </div>
              <!-- 用户名下拉菜单 -->
              <div class="user-name">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{this.$store.getters.getUser.nickname}}
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                      <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <a @click="logout">
                      <el-dropdown-item>退出登录</el-dropdown-item>
                    </a>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
            <li class="font">
              <!-- 导航下拉菜单 -->
              <div>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <router-link to="/goods">购物导航</router-link>
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="item in categoryList"
                        :key="item.category_id"
                    ><router-link :to="{ path: '/goods', query: {categoryID:item.category_id} }">
                      {{item.category_name}}
                    </router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
            <li class="font">
              <router-link to="/">我的收藏</router-link>
            </li>
            <li class="font">
              <router-link to="/">我的订单</router-link>
            </li>

            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <div style="margin-top:5px">
                <router-link to="/cart">
                  <i class="el-icon-shopping-cart-full"></i> 购物车
                  <span>({{getNum}})</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部导航栏END -->

      <!-- 顶栏容器 -->

            <el-header v-show="$route.meta.showMenu!==false">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                active-text-color="#ff6700"
                background-color="#ffffff"
                router
              >
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/goods">全部商品</el-menu-item>
                <el-menu-item index="/about">我的</el-menu-item>
                <div class="so">
                  <el-input placeholder="请输入搜索内容" v-model="search">
                    <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                  </el-input>
                </div>
              </el-menu>
            </el-header>

      <!-- 顶栏容器END -->

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view :key="key"></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->

      <!-- 底栏容器 -->
      <el-footer>
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon1" href="javascript:;">7天无理由退换货</a>
                <a class="icon2" href="javascript:;">满99元全场免邮</a>
                <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
              </p>
            </div>
          </div>
          <div class="mod_help">
            <p>
              <router-link to="/">首页</router-link>
              <span>|</span>
              <router-link to="/goods">全部商品</router-link>
              <span>|</span>
              <router-link to="/">我的</router-link>
            </p>
          </div>
        </div>
      </el-footer>
      <!-- 底栏容器END -->
    </el-container>
</template>

<script>
  export default {
    name: "layout",
    data(){
      return{

      }
    },
    computed: {
      key() {
        return this.$route.path
      }
    },
  }
</script>

<style>
  /* 全局CSS */
  * {
    padding: 0;
    margin: 0;
    border: 0;
    list-style: none;
  }

  .header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
  .el-dropdown-item:hover {
    color: #ff6700;
  }

  #app .el-header {
    padding: 0;
  }
  #app .el-main {
    min-height: 300px;
    padding: 0;
  }
  #app .el-footer {
    padding: 0;
  }
  a,
  a:hover {
    text-decoration: none;
  }
  /* 全局CSS END */

  /* 顶部导航栏CSS */
  .topbar {
    height: 50px;
    background-color: #303643;
  }
  .topbar .nav {
    width: 1225px;
    margin: 0 auto;
  }
  .topbar .nav ul:last-of-type {
    float: right;
  }
  .topbar .nav li {
    float: left;
    height: 50px;
    color: #b0b0b0;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    margin-left: 20px;
  }
  .topbar .nav li.font {
    margin-top: 5px;
  }

  .topbar .nav li .router-link {
    margin-top: 5px;
  }

  .topbar .nav li .el-button {
    color: #b0b0b0;
  }
  .topbar .nav .el-button:hover {
    color: #fff;
  }
  .topbar .nav li a {
    color: #b0b0b0;
  }
  .topbar .nav a:hover {
    color: #fff;
  }
  .topbar .nav .shopCart {
    width: 120px;
    background: #424242;
  }
  .topbar .nav .shopCart:hover {
    background: #fff;
  }
  .topbar .nav .shopCart:hover a {
    color: #ff6700;
  }
  .topbar .nav .shopCart-full {
    width: 120px;
    background: #ff6700;
  }
  .topbar .nav .shopCart-full a {
    color: white;
  }

  /* 顶部导航栏CSS END */

  /* 顶栏容器CSS */
  .el-header {
    margin-bottom: 20px;
    background-color: #ffffff;
  }
  .el-header .el-menu {
    max-width: 1225px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .el-header .logo {
    height: 60px;
    width: 100px;
    float: left;
    margin-right: 30px;
  }
  .el-header .logo img {
    height: 60px;
  }
  .el-header .so {
    width: 300px;
    margin-left: 437px;
  }
  /* 顶栏容器CSS END */

  /* 底栏容器CSS */
  .footer {
    width: 100%;
    text-align: center;
    background: #2f2f2f;
    padding-bottom: 20px;
  }
  .footer .ng-promise-box {
    border-bottom: 1px solid #3d3d3d;
    line-height: 145px;
  }
  .footer .ng-promise-box {
    margin: 0 auto;
    border-bottom: 1px solid #3d3d3d;
    line-height: 145px;
  }
  .footer .ng-promise-box .ng-promise p a {
    color: #fff;
    font-size: 20px;
    margin-right: 210px;
    padding-left: 44px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-decoration: none;
    background: url('~@/assets/imgs/us-icon.png') no-repeat left 0;
  }
  .footer .github {
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
  }
  .footer .github .github-but {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    background: url('~@/assets/imgs/github.png') no-repeat;
  }
  .footer .mod_help {
    text-align: center;
    color: #888888;
  }
  .footer .mod_help p {
    margin: 20px 0 16px 0;
  }

  .footer .mod_help p a {
    color: #888888;
    text-decoration: none;
  }
  .footer .mod_help p a:hover {
    color: #fff;
  }
  .footer .mod_help p span {
    padding: 0 22px;
  }
  .footer .mod_help a {
    color: #888888;
  }
  /* 底栏容器CSS END */
</style>