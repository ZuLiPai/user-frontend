<template>
  <div>
    <div v-for="order in data" :key="order.id">
      <a-card :title="genTitle(order)" style="width: 100%">
        <a-tag slot="extra">{{ statusText(order.status) }}</a-tag>
        <a-row type="flex" align="middle">
          <a-col :flex="3">
            <p>商品名：{{ order.item_name }}</p>
            <p>总租金：{{ order.finance_order[0].price }}元</p>
            <p>总押金：{{ order.finance_order[0].deposit }}元</p>
          </a-col>
          <a-col :flex="4" >
            <p>开始时间：{{ order.expect_start_time }}</p>
            <p>结束时间：{{ order.expect_end_time }}</p>
            <p>总天数：{{ dateDiff(order) }}天</p>
          </a-col>
          <a-col :flex="1" align="center">
            <a-button type="primary" @click="handleDetail(order.id)">订单详情</a-button>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import OrderCard from '@/views/userinfo/component/OrderCard.vue'
import storage from 'store'
import { getOrdersByUserId } from '@/api/order'
import { statusText } from '@/utils/orderStatus'
import moment from 'moment'
import router from '@/router'

export default {
  name: 'Order',
  components: { OrderCard },
  data () {
    return {
      orderTime: '2023/02/12',
      titleContent: '交易时间：2023/02/12 订单id：状态：',
      userId: storage.get('user_id'),
      data: []
    }
  },
  mounted () {
    getOrdersByUserId(this.userId).then(resp => {
      this.data = resp
    })
  },
  methods: {
    statusText,
    handleDetail (id) {
      router.push({ name: 'OrderDetail', params: { id: id } })
    },
    genTitle (order) {
      return '交易时间：' + order.create_time + ' 订单号：' + order.id
    },
    dateDiff (order) {
      const start = moment(order.expect_start_time)
      const end = moment(order.expect_end_time)
      return end.diff(start, 'days')
    }
  }
}
</script>

<style scoped>

</style>
