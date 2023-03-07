<template>
  <div>
    <order-card></order-card>
    <order-card></order-card>
    <order-card></order-card>
  </div>
</template>

<script>
import OrderCard from '@/views/userinfo/component/OrderCard.vue'

export default {
  name: 'Order',
  components: { OrderCard },
  data () {
    return {
      orderTime: '2023/02/12',
      titleContent: '交易时间：2023/02/12 订单id：状态：'
    }
  }
}
</script>

<style scoped>

</style>
