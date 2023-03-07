<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="产品名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        {{ itemName }}
      </a-form-item>
      <a-form-item
        label="租赁日期"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :required="true"
      >
        <a-range-picker @change="onChange" v-decorator="['dateRange', { rules: [{required: true, message: '请选择租赁日期'}] }]"/>
      </a-form-item>
      <a-form-item
        label="收货地址"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择收货地址"
          v-decorator="['addressUser', { rules: [{required: true, message: '收货地址必须填写'}] }]">
          <a-select-option value="1">北京市朝阳区平乐园100号北京工业大学</a-select-option>
          <a-select-option value="2"><a href="#"><a-icon type="plus" /> 添加地址</a></a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="总租金"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        900元
      </a-form-item>
      <a-form-item
        label="日均租金"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        90元
      </a-form-item>
      <a-form-item
        label=""
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-checkbox
          v-decorator="['agreeLicense', { rules: [{required: true, message: '请同意协议'}] }]"
        >同意<a href="#">协议</a></a-checkbox>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      itemName: '佳能 Canon EOS 90D'
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

<style scoped>

</style>
