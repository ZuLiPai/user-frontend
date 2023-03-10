<template>
  <div>
    <a-card :title="titleContent" style="width: 100%">
      <a slot="extra">状态</a>
      <a-row type="flex" align="middle">
        <a-col :flex="1">
          <img src="https://s1.ax1x.com/2022/09/08/vqS279.jpg" style="height: 100px; width: 100px; align-content: center">
        </a-col>
        <a-col :flex="3">
          <p>商品名：索尼 A7m3</p>
          <p>总租金：180</p>
          <p>总押金：3000</p>
        </a-col>
        <a-col :flex="4" >
          <p>开始时间：2023年3月1日</p>
          <p>结束时间：2023年3月8日</p>
          <p>总天数：8天</p>
        </a-col>
        <a-col :flex="1" align="center">
          <a>详情</a>
          <br>
          <a>评价</a>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'OrderCard',
  data () {
    return {
      orderTime: '2023/02/12',
      titleContent: '交易时间：2023/02/12  订单id：202303080001  状态：待归还'
    }
  }
}
</script>

<style scoped>
.ant-card {
  margin-bottom: 20px;
}
</style>
