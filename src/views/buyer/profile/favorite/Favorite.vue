<template>
  <div class="favorite" id="favorite" name="favorite">
    <div class="favorite-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="favorite-content">
            <div class="extra"></div>
            <div class="favorite-title">
              <p>我的收藏</p>
            </div>
            <div v-if="collectList.length>0">
              <div class="goods-list">
                <MyList :list="collectList" :isDelete="true"></MyList>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 50,100]"
                    :page-size="param.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
              </div>
              <div class="extra"></div>
              <div class="extra"></div>
              <!-- 分页END -->
            </div>
            <!-- 订单为空的时候显示的内容 -->
            <div v-else class="empty">
              <p>你暂未收藏任何商品</p>
            </div>
            <!-- 订单为空的时候显示的内容END -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import MyList from "@/components/MyList";
  import CenterMenu from "@/components/CenterMenu";
  import {getList, deleteFavorite} from "@/api/favorite";
  import {getInfo} from "@/api/goods";

  export default {
    name: "Favorite",
    components: {
      MyList,
      CenterMenu
    },
    data() {
      return {
        collectList: [],
        total: 0,
        param: {
          id: '',
          page: 1, //分页，即第几页的数据
          limit: 10 //每页条数，即每页的数据数
        },
      }
    },
    methods: {
      handleSizeChange(val) {
        this.param.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.param.page = val
        this.fetchData()
      },
      async getFavorites() {
        // 获取收藏数据
        this.param.id = window.sessionStorage.getItem('userid')
        const favorite = await getList(this.param)
        console.log(favorite)
        if (favorite.code === 200) {
          this.total = favorite.total
          for (let i = 0; i < favorite.data.length; i++) {
            let data = await getInfo({GoodsId:favorite.data[i].GoodsId})
            this.collectList.push(data.data[0])
          }
        } else {
          this.$baseMessage('获取收藏夹失败', 'error')
        }
      }
    },
    activated() {
      this.getFavorites()
    },

  }
</script>

<style scoped>
  .favorite-layout {
    max-width: 1225px;
    margin: 0 auto;
  }

  .favorite-content {
    background-color: #ffffff;
    margin-bottom: 30px;
  }

  .favorite-title {
    height: 100px;
    display: flex;
    align-items: center;
  }

  .favorite-title p {
    font-size: 30px;
    color: #757575;
    margin-left: 50px;
  }

  .extra {
    height: 10px;
  }

  .goods-list {
    overflow: hidden;
  }

  .favorite-content .pagination {
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .empty {
    width: 200px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 70px;
    color: #bdbaba;
    font-size: 18px;
  }
</style>