<template>
  <div>
    <a-result title="下单成功" status="success" sub-title="请等待客服审核发货" style="max-width: 560px; margin: 40px auto 0;">
      <div class="information">
        <a-row>
          <a-col :sm="8" :xs="24">租赁产品：</a-col>
          <a-col :sm="16" :xs="24">佳能 Canon EOS 90D</a-col>
        </a-row>
        <a-row>
          <a-col :sm="8" :xs="24">租赁时间：</a-col>
          <a-col :sm="16" :xs="24">2023年3月1日 ~ 2023年3月8日</a-col>
        </a-row>
        <a-row>
          <a-col :sm="8" :xs="24">收货地址：</a-col>
          <a-col :sm="16" :xs="24">北京市朝阳区平乐园100号北京工业大学<br>小熊<br>13800138000</a-col>
        </a-row>
        <a-row>
          <a-col :sm="8" :xs="24">总租金：</a-col>
          <a-col :sm="16" :xs="24"><span class="money">900</span> 元</a-col>
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
</template>

<script>
export default {
  name: 'Step3'
}
</script>

<style lang="less" scoped>

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
</style>
