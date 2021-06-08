<template>
  <div class="center" id="center" name="center">
    <div class="center-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="center-content">
            <!--个人信息头部-->
            <div class="center-user">
              <div class="user-avator">
                <img :src="getUserImg" />
              </div>
              <div class="user-info">
                <p
                    style="font-size:25px;font-weight:100;color:#464547"
                >{{getBuyer.Name}}</p>
                <p>
                  <router-link to="/user/details" style="font-size:13px;color:#ff6700;">修改个人信息 ></router-link>
                </p>
              </div>
              <div class="user-message">
                <ul>
                  <li>绑定手机：</li>
                </ul>
              </div>
              <div class="user-data">
                <ul>
                  <li>{{getBuyer.Phone}}</li>
                </ul>
              </div>
            </div>
            <!--end--个人信息头部-->
            <div class="user-details">
              <div class>
                <img src="https://s01.mifile.cn/i/user/portal-icon-1.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待支付订单：{{unPayTotal}}</p>
                <p>
                  <router-link :to="{ path: '/order', query: {activeName:'UnPay'} }" class="oper-href">查看待支付订单 ></router-link>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-2.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">已付款订单：{{paidTotal}}</p>
                <p>
                  <router-link :to="{ path: '/order', query: {activeName:'UnPay'} }" class="oper-href">查看已付款订单 ></router-link>
                </p>
              </div>
            </div>
            <div class="user-details1">
              <div class>
                <img src="https://s01.mifile.cn/i/user/portal-icon-3.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待评价商品：0</p>
                <p>
                  <router-link to class="oper-href">查看待评价订单 ></router-link>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-4.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">收藏的商品：{{favoriteTotal}}</p>
                <p>
                  <router-link :to="{ path: '/favorite'}" class="oper-href">查看收藏的商品 ></router-link>
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import CenterMenu from "@/components/CenterMenu";
  import {mapActions, mapGetters} from "vuex";
  import {getCount} from "@/api/order";
  import {favoriteCount} from "@/api/favorite";

  export default {
    name: "Center",
    components: {
      CenterMenu
    },
    data() {
      return {
        favoriteTotal: 0,
        unPayTotal: 0,
        paidTotal: 0,
      }
    },
    computed:{
      ...mapGetters(['getUserImg','getBuyer','getUserId']),
    },
    methods: {
      async getCount() {
        const unPay=await getCount({status:'UnPay'})
        const paid=await getCount({status:'UnPay'})
        const favorite=await favoriteCount({userid:window.sessionStorage.getItem('userid')})
        this.unPayTotal=unPay.data
        this.paidTotal=paid.data
        this.favoriteTotal=favorite.data
      }
    },
    activated() {
      this.getCount()
    },
  }
</script>

<style scoped>
  .center-layout {
    max-width: 1225px;
    margin: 0 auto;
  }
  .center-content {
    background-color: #ffffff;
    margin-bottom: 30px;
  }
  .center-user {
    height: 280px;
    width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0;
    border-bottom: 1px solid #c2c4ca;
  }
  .user-avator img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding: 5px;
    border: 1px solid #ddd;
  }
  .user-info {
    width: 260px;
    line-height: 30px;
    margin-left: 15px;
    padding: 0;
  }
  .user-message {
    line-height: 30px;
    padding: 0;
  }
  .user-message ul li {
    color: #77787b;
    font-size: 15px;
  }
  .user-data {
    line-height: 30px;
    padding: 0;
  }
  .user-data ul li {
    color: #77787b;
    font-size: 15px;
  }
  .user-data ul li a {
    color: #77787b;
  }
  .user-data ul li a:hover {
    color: #ff6700;
  }
  .user-details {
    height: 150px;
    width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-top: 50px;
  }
  .user-details1 {
    height: 150px;
    width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding-bottom: 50px;
  }
  .operate {
    margin-left: 200px;
  }
  .operate1 {
    line-height: 30px;
    margin-left: 20px;
  }
  .operate1 .oper-title {
    font-size: 20px;
    color: #7b7f86;
  }
  .operate1 .oper-href {
    font-size: 15px;
    color: #7b7f86;
  }
  .operate1 .oper-href:hover {
    color: #ff6700;
  }

  .email-pop-out {
    text-align: center;
  }
</style>