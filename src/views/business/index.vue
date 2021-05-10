<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item index="/business">主页</el-menu-item>
          <el-menu-item index="/delete">注销</el-menu-item>
          <el-menu-item index="/update">更新</el-menu-item>
          <el-menu-item index="/address">地址</el-menu-item>
          <el-menu-item index="/upload">上传</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="logout">登出</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link
                  type="primary"
                  href="/update"
                  style="float:right;margin-bottom:10px;"
              >修改</el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link
                  type="primary"
                  href="/delete"
                  style="float:right;margin-bottom:10px;"
              >注销</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <div v-if="routerView">
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/business' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
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
</style>
