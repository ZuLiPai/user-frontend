<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item>
        <a-radio-group v-model="value" @change="onChange">
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
export default {
  name: 'Step2',
  data () {
    return {
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
          console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep')
          }, 1500)
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
