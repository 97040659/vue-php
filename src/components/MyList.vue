<template>
  <div id="myList" class="myList">
    <ul>
      <li v-for="(item,index) in list" :key="item.GoodsId"
          @click="setClick({GoodsId:item.GoodsId,Click:item.Click})">
        <el-popover placement="top">
          <p>确定删除吗？</p>
          <div style="text-align: right; margin: 10px 0 0">
            <el-button type="primary" size="mini" @click="deleteFavorite(item.GoodsId,index)">确定</el-button>
          </div>
          <i class="el-icon-close delete" slot="reference" v-show="isDelete"></i>
        </el-popover>
        <router-link :to="{ path: '/goods/details', query: {productID:item.GoodsId} }">
          <img :src="item.GoodsImg" alt/>
          <h2>{{item.GoodsName}}</h2>
          <h3>{{item.GoodsInfo}}</h3>
          <p>
            <span>{{item.Price}}元</span>
          </p>
        </router-link>
      </li>
      <li v-show="isMore && list.length>=1" id="more">
        <router-link :to="{ path: '/goods', query: {categoryID:categoryID} }">
          浏览更多
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {deleteFavorite} from "@/api/favorite";
  import {mapActions} from "vuex";
  import {updateClick} from "../api/goods";

  export default {
    name: "MyList",
    props: ['list', 'isMore', 'isDelete'],
    data() {
      return {
        id: '',
        key: ''
      }
    },
    beforeRouteLeave() {

    },
    computed: {
      // 通过list获取当前显示的商品的分类ID，用于“浏览更多”链接的参数
      categoryID: function () {
        let categoryID = []
        if (this.list != '') {
          for (let i = 0; i < this.list.length; i++) {
            const id = this.list[i].CategoryId
            if (!categoryID.includes(id)) {
              categoryID.push(id)
            }
          }
        }
        return categoryID
      }
    },
    methods: {
      ...mapActions(['setClick', 'getClickById']),
      async deleteFavorite(productId, index) {
        var form = {
          userid: window.sessionStorage.getItem('userid'),
          GoodsId: productId
        }
        const data = await deleteFavorite(form)
        console.log(data)
        if (data.code === 200) {
          this.list.splice(index, 1)
          this.$baseMessage(data.msg, 'success')
        } else {
          this.$baseMessage(data.msg, 'error')
        }
      },
      //   handleChange(key,id){
      //     // this.handelUpdate(key,id)
      //     console.log(key)
      //   },
      //   async handelUpdate(key,id){
      //     const data= {
      //       GoodsId:id,
      //       Click:this.list[key].Click++
      //     }
      //     const res=await updateClick(data)
      //     console.log(res)
      //   },
    }
  }
</script>

<style scoped>
  .myList ul li {
    z-index: 1;
    float: left;
    width: 234px;
    height: 280px;
    padding: 10px 0;
    margin: 0 0 14.5px 13.7px;
    background-color: white;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    position: relative;
  }

  .myList ul li:hover {
    z-index: 2;
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }

  .myList ul li img {
    display: block;
    width: 160px;
    height: 160px;
    background: url(../assets/imgs/placeholder.png) no-repeat 50%;
    margin: 0 auto;
  }

  .myList ul li h2 {
    margin: 25px 10px 0;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .myList ul li h3 {
    margin: 5px 10px;
    height: 18px;
    font-size: 12px;
    font-weight: 400;
    color: #b0b0b0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .myList ul li p {
    margin: 10px 10px 10px;
    text-align: center;
    color: #ff6700;
  }

  .myList ul li p .del {
    margin-left: 0.5em;
    color: #b0b0b0;
    text-decoration: line-through;
  }

  .myList #more {
    text-align: center;
    line-height: 280px;
  }

  .myList #more a {
    font-size: 18px;
    color: #333;
  }

  .myList #more a:hover {
    color: #ff6700;
  }

  .myList ul li .delete {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
  }

  .myList ul li:hover .delete {
    display: block;
  }

  .myList ul li .delete:hover {
    color: #ff6700;
  }
</style>