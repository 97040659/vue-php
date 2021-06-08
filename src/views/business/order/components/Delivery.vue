<template>
  <el-dialog
      title="发货"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="handleClose">
    <el-form ref="addForm" :model="addForm" label-width="80px">
      <el-form-item label="地址" prop="address">
        <el-select v-model="addForm.BusinessAddress">
          <el-option
              v-for="item in address"
              :key="item.AddressId"
              :label="item.Address"
              :value="item.AddressId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSave('addForm')">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {getList} from "@/api/address";

  export default {
    name: "Delivery",
    data() {
      return {
        addDialogVisible: false,
        address:[],
        addForm: {},
      }
    },
    methods: {
      async handleShow(row) {
        const data = await getList({userid:window.sessionStorage.getItem('userid')})
        this.address = data.data
        this.addForm=row
        this.addDialogVisible = true
      },
      handleClose() {
        this.$refs['addForm'].resetFields()
        this.addForm = this.$options.data().addForm
        this.addDialogVisible = false
        this.$emit('fetch-data')
      },
      addSave(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return
          }
          if (data.code === 200) {
            this.$emit('fetch-data')
            this.addDialogVisible = false
            this.addForm = this.$options.data().addForm
            this.$baseMessage(data.msg, 'success')
          } else {
            this.addForm = this.$options.data().addForm
            this.$baseMessage(data.msg, 'error')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>