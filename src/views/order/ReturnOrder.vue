<template>
  <div>
    <a-row style="max-width: 80%; margin: 0 auto">
      <a-col :span="24">
        <a-card title="归还商品">
          <p><strong>待归还商品：{{ data.item_name }}</strong></p>
          <a-divider></a-divider>
          <p><strong>收件人：库克</strong></p>
          <p><strong>电话：13800138000</strong></p>
          <p><strong>寄回地址：北京市朝阳区平乐园100号北京工业大学租立拍相机租赁</strong></p>
          <a-divider></a-divider>
          <a-form :form="expressForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" @submit="handleExpressOk">
            <a-form-item
              label="快递公司"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-select
                v-decorator="[
                  'express_name_id',
                  { rules: [{ required: true, message: '请选择快递公司' }] },
                ]"
                placeholder="请选择快递公司"
              >
                <a-select-option v-for="mes in this.expressCompanyOption" :key="mes.express_id" :value="mes.express_id">
                  {{ mes.express_name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="快递单号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input v-decorator="['express_number', {rules: [{required: true, message: '请输入快递单号'}]},]" placeholder="请输入快递单号" />
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
              <a-button type="primary" html-type="submit">
                提交
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { createExpress, getExpressCompany, getOrderDetail, updateOrder } from '@/api/order'

export default {
  name: 'ReturnOrder',
  data () {
    return {
      orderId: this.$route.params.id,
      formLayout: 'horizontal',
      expressText: '',
      expressForm: this.$form.createForm(this, { name: 'coordinated' }),
      expressVisible: false,
      expressCompanyOption: '',
      data: {}
    }
  },
  mounted () {
    getExpressCompany().then(resp => {
      console.log(resp)
      this.expressCompanyOption = resp
      console.log(this.expressCompanyOption)
    })
    getOrderDetail(this.orderId).then(resp => {
      this.data = resp
    })
  },
  computed: {
    formItemLayout () {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 12 }
        }
        : {}
    },
    buttonItemLayout () {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 10 }
        }
        : {}
    }
  },
  methods: {
    handleExpressOk (e) {
      e.preventDefault()
      this.expressForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const form = {
            ...values,
            express_kind: true,
            express_order: this.orderId
          }
          console.log(form)
          createExpress(this.orderId, form).then(() => {
            // 获取当前时间
            const currentDateTime = new Date()
            const year = currentDateTime.getFullYear()
            const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2)
            const day = ('0' + currentDateTime.getDate()).slice(-2)
            const hour = ('0' + currentDateTime.getHours()).slice(-2)
            const minute = ('0' + currentDateTime.getMinutes()).slice(-2)
            const second = ('0' + currentDateTime.getSeconds()).slice(-2)
            const datetime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
            // 构建请求数据
            const data = {
              id: this.orderId,
              status: '3',
              actual_end_time: datetime,
              expect_end_time: this.data.expect_end_time,
              expect_start_time: this.data.expect_start_time
            }
            console.log(data)
            updateOrder(this.orderId, data).then(() => {
              this.$message.success('归还成功').then(() => {
                setInterval(() => this.$router.push({ name: 'OrderDetail', params: { id: this.orderId } }), 500)
              })
            })
          }).catch(() => {
            this.$message.error('出错了')
          })
        }
      })
    },
    handleSelectChange (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
