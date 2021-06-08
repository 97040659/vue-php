<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>评价商品</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="" class="product">
        <div class="pro-img">
          <router-link
              :to="{ path: '/goods/details', query: {productID:form.GoodsId} }"
          >
            <img :src="form.GoodsImg"/>
          </router-link>
        </div>
        <div class="pro-info">
          <span>
            <router-link
                class="info-href"
                :to="{ path: '/goods/details', query: {productID:form.GoodsId} }"
            >{{form.GoodsName}}</router-link>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-radio-group v-model="form.appraise">
          <el-radio label="好评"></el-radio>
          <el-radio label="一般"></el-radio>
          <el-radio label="差评"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表评论</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {getInfo,dealOrder} from "@/api/order";
  import {saveAppraise} from "@/api/appraise";

  export default {
    name: "Appraise",
    data() {
      return {
        Id:0,
        form: {
          userid: '',
          appraise: '',
          content: ''
        }
      }
    },
    activated() {
      if (this.$route.query.Id != undefined) {
        this.Id = this.$route.query.Id
        console.log(this.Id)
      }
    },
    watch: {
      // 监听商品id的变化，请求后端获取商品数据
      Id: function () {
        this.fetchData()
      },
    },
    methods: {
      // 获取商品详细信息
      async fetchData() {
        const order = {
          id: this.Id
        }
        const data = await getInfo(order)
        this.form = data.data[0]
        console.log(this.form)
      },
      async onSubmit() {
        const order={id:this.form.Id,Status:'Appraised'}
        const data = await saveAppraise(this.form)
        if (data.code == 200) {
          await dealOrder({id:this.form.Id,Status:'Appraised'})
          this.$router.push('/order')
        } else {
          this.$baseMessage(data.msg, 'error')
        }
      }
    }
  }
</script>

<style scoped>
  .product {
    height: 200px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    /*border-left: 1px solid #ff6700;*/
    /*border-right: 1px solid #ff6700;*/
    /*border-bottom: 1px solid #ff6700;*/
  }

  .product .pro-img {
    margin-left: 30px;
    margin-right: 20px;
  }

  .product .pro-img img {
    height: 120px;
    width: 120px;
  }

  .product .pro-info {
    font-size: 15px;
    color: #333333;
  }

  .product .pro-info span {
    margin: 0 60px;
  }

  .product .pro-info .info-href {
    font-size: 15px;
    color: #333333;
  }

  .product .pro-info .info-href:hover {
    color: #ff6700;
  }

</style>