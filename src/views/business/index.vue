<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
          class="el-menu-vertical-demo"
          style="background-color: #303643;"
          :collapse="isCollapse"
          router
      >
<!--          <el-menu-item index="/business">-->
<!--            <i class="el-icon-s-home" style="margin-right: 20px"></i>-->
<!--            主页</el-menu-item>-->
          <el-menu-item index="/goodsManagement" style="color: #b0b0b0;">
            <i class="el-icon-s-goods" style="margin-right: 20px"></i>
            商品管理</el-menu-item>
          <el-menu-item index="/orderManagement" style="color: #b0b0b0;">
            <i class="el-icon-s-order" style="margin-right: 20px"></i>
            订单管理</el-menu-item>
          <el-menu-item index="/addressManagement" style="color: #b0b0b0;">
            <i class="el-icon-location" style="margin-right: 20px"></i>
            地址管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #303643;color: #b0b0b0;">
        <el-dropdown>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>
              <span @click="logout">登出</span>
            </el-dropdown-item>
<!--            <el-dropdown-item>-->
<!--              <el-link-->
<!--                  type="primary"-->
<!--                  href="/update"-->
<!--                  style="float:right;margin-bottom:10px;"-->
<!--              >修改</el-link>-->
<!--            </el-dropdown-item>-->
<!--            <el-dropdown-item>-->
<!--              <el-link-->
<!--                  type="primary"-->
<!--                  href="/delete"-->
<!--                  style="float:right;margin-bottom:10px;"-->
<!--              >注销</el-link>-->
<!--            </el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 15px">{{getBusiness.Name}}</span>
      </el-header>
      <div v-if="routerView">
      <el-main>
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--          <el-breadcrumb-item :to="{ path: '/business' }">首页</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        <el-divider></el-divider>-->
        <transition mode="out-in" name="el-fade-in-linear">
          <keep-alive :max="keepAliveMaxNum">
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </el-main>
      <el-divider></el-divider>
      <el-footer>
        电子商城管理系统-{{getBusiness.Name}}
      </el-footer>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import {getInfo} from '@/api/user'
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: 'index',
    components:{},
    data() {
      return {
        result:'',
        isCollapse: false,
        keepAliveMaxNum: 5,
        routerView: true,
      }
    },
    created() {
      this.getInfo()
      this.routerView = false
      this.$nextTick(() => {
        this.routerView = true
      })
      // this.test();
    },
    computed: {
      ...mapGetters(['getBusiness']),
      key() {
        return this.$route.path
      },
    },
    methods:{
      ...mapActions(['setBusiness']),
      logout(){
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      async getInfo(){
        const user={
          userid:window.sessionStorage.getItem('userid')
        }
        const data=await getInfo(user)
        this.setBusiness(data.data[0])
        console.log(data)
      }
    }
  }
</script>

<style>
  .el-container{
    height: 100%;
    width: 100%;
  }

  .el-aside {
    color: #333;
    border-right: 1px solid #e6e6e6;
    overflow-x: hidden;
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-footer{
    text-align: center;
  }
  .el-main{
    overflow-x: hidden;
  }
</style>
