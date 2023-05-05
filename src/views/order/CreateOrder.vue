<template>
  <div>
    <a-page-header
      title="创建订单"
      @back="$router.go(-1)"
      style="padding-top: 0"
    />
    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="确认信息" />
        <a-step title="付款" />
        <a-step title="完成" />
      </a-steps>
      <div class="content">
        <!--        <step1 v-if="currentTab === 0" @nextStep="nextStep"/>-->
        <div v-if="currentTab === 0">
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
              label="">
              <a-checkbox
                v-decorator="['agreeLicense', { rules: [{required: true, message: '请同意协议'}] }]"
              >同意<a @click="router().push({name: 'PrivacyProtocol'})">《租立拍相机租赁平台客户隐私协议》</a>、
                <a @click="router().push({name: 'ServeProtocol'})">《租立拍相机租赁平台客户服务协议》</a>、
                <a @click="router().push({name: 'RentProtocol'})">《租立拍相机租赁平台客户租赁协议》</a></a-checkbox>
            </a-form-item>
            <a-form-item :wrapperCol="{span: 19, offset: 5}">
              <a-button type="primary" @click="nextStep">下一步</a-button>
            </a-form-item>
          </a-form>
        </div>
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" :last-f="this.form.getFieldsValue()"/>
        <!--        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish"/>-->
        <div v-if="currentTab === 2">
          <a-result title="下单成功" status="success" sub-title="请等待客服审核发货" style="max-width: 560px; margin: 40px auto 0;">
            <div class="information">
              <a-row>
                <a-col :sm="8" :xs="24">租赁产品：</a-col>
                <a-col :sm="16" :xs="24">{{ itemName }}</a-col>
              </a-row>
              <a-row>
                <a-col :sm="8" :xs="24">租赁时长：</a-col>
                <a-col :sm="16" :xs="24">{{ dateRange }}天</a-col>
              </a-row>
              <a-row>
                <a-col :sm="8" :xs="24">收货地址：</a-col>
                <a-col :sm="16" :xs="24">{{ getAddress }}</a-col>
              </a-row>
              <a-row>
                <a-col :sm="8" :xs="24">总租金：</a-col>
                <a-col :sm="16" :xs="24"><span class="money">{{ totalFee }}</span> 元</a-col>
              </a-row>
            </div>

            <template #extra>
              <a-button type="primary" @click="$router.push({name: 'Order'})">
                查看订单
              </a-button>
              <a-button @click="$router.push({name: 'index'})">
                返回首页
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import Step1 from '@/views/order/createSteps/Step1.vue'
import Step2 from '@/views/order/createSteps/Step2.vue'
import Step3 from '@/views/order/createSteps/Step3.vue'
import storage from 'store'
import router from '@/router'
import moment from 'moment/moment'
import { getItemById } from '@/api/item'
import { getUserAddresses } from '@/api/address'
export default {
  name: 'CreateOrder',
  components: {
    Step1,
    Step2,
    Step3
  },
  data () {
    return {
      currentTab: 0,
      itemId: this.$route.params.itemId,

      userId: storage.get('user_id'),
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      itemName: '',
      dateRange: 0,
      fee: 0,
      deposit: 0,
      totalFee: 0,
      addresses: [],
      selectedAddress: null
    }
  },
  computed: {
    // computed
    getAddress () {
      const addr = this.addresses.find(item => item.id === this.selectedAddress)
      return addr.name + ' ' + addr.phone + ' ' + addr.address
    }
  },
  methods: {
    // handler
    nextStep () {
      if (this.currentTab === 0) {
        this.selectedAddress = this.form.getFieldsValue().addressUser
        // 先校验，通过表单校验后，才进入下一步
        this.form.validateFields((err, values) => {
          const now = moment()
          if (values.dateRange[0].isBefore(now)) {
            this.$message.error('租赁日期必须大于当前日期')
            return
          }
          if (!err) {
            this.currentTab += 1
          }
        })
      } else if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    },
    router () {
      return router
    },
    onAddAddress () {
      this.$router.push({ name: 'Address' })
    },
    onChange (date, dateString) {
      this.dateRange = date[1].diff(date[0], 'days')
      this.totalFee = this.fee * this.dateRange + this.deposit
    }
  },
  mounted () {
    if (this.itemId) {
      getItemById(this.itemId).then(res => {
        this.itemName = res.name
        this.fee = res.price
        this.deposit = res.deposit
      })
    } else {
      router.go(-1)
    }
    if (this.userId) {
      getUserAddresses(this.userId).then(res => {
        this.addresses = res
      })
    } else {
      router.push({ name: 'login' })
    }
  }
}
</script>

<style lang='less' scoped>
.price-number {
  font-weight: bold;
  font-size: 20px;
  /*color: #f5222d;*/
}

.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}

.money {
  font-family: "Helvetica Neue",sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
.payment-radio {
  display: block; height: 90px; line-height: 50px;
}
</style>
