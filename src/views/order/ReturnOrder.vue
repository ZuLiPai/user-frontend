<template>
  <div>
    <a-row style="max-width: 80%; margin: 0 auto">
      <a-col :span="24">
        <a-card title="归还商品">
          <p><strong>待归还商品：佳能 Canon EOS 5D Mark IV</strong></p>
          <a-divider></a-divider>
          <p><strong>收件人：库克</strong></p>
          <p><strong>电话：13800138000</strong></p>
          <p><strong>寄回地址：北京市朝阳区平乐园100号北京工业大学租立拍相机租赁</strong></p>
          <a-divider></a-divider>
          <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item
              label="快递公司"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol">
              <a-select
                v-decorator="[
                  '快递公司',
                  { rules: [{ required: true, message: '请选择快递公司' }] },
                ]"
                placeholder="请选择快递公司"
              >
                <a-select-option value="SF">
                  顺丰速运
                </a-select-option>
                <a-select-option value="YT">
                  圆通快递
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="快递单号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input v-decorator="['快递单号', {rules: [{required: true, message: '请输入快递单号'}]},]" placeholder="请输入快递单号" />
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
              <a-button type="primary">
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
export default {
  name: 'ReturnOrder',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
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
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
