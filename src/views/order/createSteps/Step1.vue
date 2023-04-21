<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="产品名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <span class="price-number">{{ itemName }}</span>
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
        label="租赁天数"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <span class="price-number">{{ dateRange }}</span> 天
      </a-form-item>
      <a-form-item
        label="收货地址"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择收货地址"
          v-decorator="['addressUser', { rules: [{required: true, message: '收货地址必须填写'}] }]">
          <a-select-option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.name }} - {{ address.address }} - {{ address.phone }}</a-select-option>
          <a-select-option value="add"><a @click="onAddAddress"><a-icon type="plus" /> 添加地址</a></a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="日租金"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <span class="price-number">{{ fee }}</span> 元
      </a-form-item>
      <a-form-item
        label="押金"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <span class="price-number">{{ deposit }}</span> 元
      </a-form-item>
      <a-form-item
        label="总金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <span class="price-number" style="color: #ff835d; font-size: 24px">{{ totalFee }}</span> 元
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
import { getItemById } from '@/api/item'
import moment from 'moment'
import storage from 'store'
import { getUserAddresses } from '@/api/address'

export default {
  name: 'Step1',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userId: storage.get('user_id'),
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      itemName: '',
      dateRange: 0,
      fee: 0,
      deposit: 0,
      totalFee: 0,
      addresses: []
    }
  },
  methods: {
    onAddAddress () {
      this.$router.push({ name: 'Address' })
    },
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        const now = moment()
        if (values.dateRange[0].isBefore(now)) {
          this.$message.error('租赁日期必须大于当前日期')
          return
        }
        if (!err) {
          this.$emit('nextStep')
        }
      })
    },
    onChange (date, dateString) {
      this.dateRange = date[1].diff(date[0], 'days')
      this.totalFee = this.fee * this.dateRange + this.deposit
    }
  },
  mounted () {
    if (this.id) {
      getItemById(this.id).then(res => {
        this.itemName = res.name
        this.fee = res.price
        this.deposit = res.deposit
      })
    }
    getUserAddresses(this.userId).then(res => {
      this.addresses = res
    })
  }
}
</script>

<style scoped>
.price-number {
  font-weight: bold;
  font-size: 20px;
  /*color: #f5222d;*/
}
</style>
