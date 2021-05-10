<template>
  <div class="address" id="address" name="address">
    <div class="address-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="address-content">
            <div class="extra"></div>
            <div class="address-title">
              <p>收货地址</p>
            </div>
            <div class="address-body">
              <ul>
                <router-link to>
                  <li
                      :class="item.AddressId == confirmAddress ? 'in-section' : ''"
                      v-for="(item,index) in address"
                      :key="item.AddressId"
                      @mouseenter="mouseEnter(item)"
                      @mouseleave="mouseLeave(item)"
                  >
                    <h2>{{item.Name}}</h2>
                    <p class="phone">{{item.Phone}}</p>
                    <p class="address">{{item.Address}}</p>
                    <div class="operate" v-show="item.seen">
                      <span @click="edit(item)">修改</span>
                      <span @click="deleteDialog(item.AddressId,index)">删除</span>
                    </div>
                  </li>
                </router-link>
                <router-link to>
                  <li class="add-address" @click="addVisible=true">
                    <i class="el-icon-circle-plus-outline"></i>
                    <p>添加新地址</p>
                  </li>
                </router-link>
              </ul>
            </div>
          </div>
          <!-- 新建收货地址弹出框 -->
          <el-dialog title="新建收货地址" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
              <el-form-item label="姓名">
                <el-input v-model="form.Name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.Phone"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input type="textarea" rows="5" v-model="form.Address"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="postEdit">确 定</el-button>
              <el-button @click="addVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 新建收货地址弹出框END -->
          <!-- 修改收货地址弹出框 -->
          <el-dialog title="修改收货地址" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
              <el-form-item label="姓名">
                <el-input v-model="form.Name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.Phone"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input type="textarea" rows="5" v-model="form.Address"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="saveEdit">确 定</el-button>
              <el-button @click="editVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 修改收货地址弹出框END -->
          <!-- 删除收货地址弹出框 -->
          <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" center>
            <div class="delete-dialog">
              <span>确认删除该地址吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="deleteAddress">确 定</el-button>
              <el-button @click="deleteVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- 删除收货地址弹出框END -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import CenterMenu from "@/components/CenterMenu";
  import {getList,save,deleteAddress} from "@/api/address";

  export default {
    name: "UserAddress",
    components: {
      CenterMenu
    },
    data() {
      return {
        address: [],
        addVisible: false,
        editVisible: false,
        deleteVisible: false,
        confirmAddress: 0, // 选择的地址id
        addressID: 0,
        addressIndex: 0,
        form: {
          AddressId: '',
          UserId: '',
          Name: '',
          Phone: '',
          Address: ''
        }
      }
    },
    created() {
      this.getAddress()
    },
    methods: {
      async getAddress() {
        const data=await getList({userid:window.sessionStorage.getItem('userid')})
        this.address=data.data
        console.log(this.address)
      },
      mouseEnter(item) {
        console.log(item)
        item.seen = true
        this.confirmAddress = item.AddressId
      },
      mouseLeave(item) {
        item.seen = false
        this.confirmAddress = 0
      },
      edit(item) {
        this.form = item
        this.editVisible = true
      },
      deleteDialog(val, index) {
        this.addressID = val
        this.addressIndex = index
        this.deleteVisible = true
      },
      async postEdit() {
        this.form.UserId = this.$store.getters.getUserId
        await save(this.form)
        this.addVisible = false
        this.getAddress()
      },
      async saveEdit() {
        await save(this.form)
        this.editVisible = false
        this.getAddress()
      },
      async deleteAddress() {
        await deleteAddress({AddressId:this.addressID})
        this.deleteVisible = false
        this.getAddress()
      }
    },
  }
</script>

<style scoped>
  .address-layout {
    max-width: 1225px;
    margin: 0 auto;
  }
  .address-content {
    background-color: #ffffff;
    margin-bottom: 30px;
  }
  .address-title {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .address-title p {
    font-size: 30px;
    color: #757575;
    margin-left: 50px;
  }
  .extra {
    height: 10px;
  }
  /*收货地址列表*/
  .address .address-layout .address-content .address-body {
    overflow: hidden;
    width: 910px;
    margin: 0 auto;
  }
  .address .address-layout .address-content .address-body ul li {
    float: left;
    color: #333;
    width: 220px;
    height: 178px;
    border: 1px solid #e0e0e0;
    padding: 15px 24px 0;
    margin-right: 17px;
    margin-bottom: 24px;
  }
  .address .address-layout .address-content .address-body .in-section {
    border: 1px solid #ff6700;
  }
  .address .address-layout .address-content .address-body li h2 {
    font-size: 18px;
    font-weight: normal;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .address .address-layout .address-content .address-body li p {
    font-size: 14px;
    color: #757575;
  }
  .address .address-layout .address-content .address-body li .address {
    padding: 10px 0;
    max-width: 180px;
    height: 70px;
    line-height: 22px;
    overflow: hidden;
  }

  .address .address-layout .address-content .address-body li .operate {
    color: #ff6700;
    font-size: 14px;
    float: right;
  }

  .address .address-layout .address-content .address-body li .operate span {
    margin-right: 10px;
  }
  .address .address-layout .address-content .address-body .add-address {
    text-align: center;
    line-height: 30px;
  }
  .address .address-layout .address-content .address-body .add-address i {
    font-size: 30px;
    padding-top: 50px;
    text-align: center;
  }
  /*收货地址列表END*/
  .address .address-layout .delete-dialog {
    margin: 0 auto;
    width: 180px;
    font-size: 20px;
  }
</style>