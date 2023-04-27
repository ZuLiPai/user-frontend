<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item>
        <a-radio-group v-model="value">
          <a-radio :style="radioStyle" :value="1">
            微信支付
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            支付宝支付
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            银联支付
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            信用卡支付
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">去付款</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { createOrder } from '@/api/order'
import storage from 'store'

export default {
  name: 'Step2',
  props: {
    lastF: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      itemId: this.$route.params.itemId,
      userId: storage.get('user_id'),

      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      value: 1,
      radioStyle: {
        display: 'block',
        height: '90px',
        lineHeight: '50px'
      }
    }
  },
  methods: {
    nextStep () {
      const that = this
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          const data = {
            item: this.itemId,
            user: this.userId,
            address: this.lastF.addressUser,
            expect_start_time: this.lastF.dateRange[0].format('YYYY-MM-DD'),
            expect_end_time: this.lastF.dateRange[1].format('YYYY-MM-DD')
          }
          createOrder(data).then(res => {
            that.loading = false
            that.$emit('nextStep')
          }).catch(() => {
            that.loading = false
            this.$message.error('创建订单失败')
          })
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>

<style scoped>

</style>
