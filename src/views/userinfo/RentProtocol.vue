<template>
  <html>
    <body>
      <h1 style="text-align: center">《租立拍相机租赁平台客户租赁协议》</h1>
      <h2>1、租期</h2>
      <p>租金计算方式为从<strong>收到物品后第二天起，至寄回前一天止。</strong>我们会按照您下单的收件日送达物品，<strong>如果提前收到，不多收取租金。</strong>例如您要求3月1号收到，3月7号寄出，则租金计算为5天。<strong>重要提示：为了确保物流准时送达，快递服务全部使用顺丰快递并按照顺丰承诺时效发货，</strong>但由于偶发的不可抗拒力因素，顺丰可能会发生延误。为防止意外，请根据出行日期合理设置收到日期，建议收到日为使用前一天。</p>
      <h2>2、订单金额</h2>
      <p>订单金额将根据不同商品的押金、基本租金及租赁期限的长短进行计算，具体收费标准详见商品详情中的价格表。</p>
      <p><strong>订单金额的计算方式包括商品押金和商品租金即订单金额=商品押金+商品租金；其中，对于商品租金根据商品租赁时间进行计算，租赁时长小于（含）3天，商品单日租金为商品基本租金；租赁时长大于3天小于（含）7天部分，商品单日租金为商品基本租金的80%；商品租赁时长大于7天部分，商品单日租金为商品基本租金的50%；商品的最长租赁时间为14天。</strong></p>
      <p>用户应当在租赁开始前支付全部订单金额，如未按时支付租金，租赁公司有权解除租赁协议。租赁费用不包括附加费用，如保险费用和运输费用等。</p>
      <h2>3、取消订单</h2>
      <p><strong>用户可以在订单发货前取消订单，发货后无法取消订单。在发货后由各种原因需要停止租赁的用户，需要在收到商品后将商品发回租立拍公司。本公司不承担任何由取消订单造成的任何经济损失，所有订单费用由用户自己承担。</strong></p>
      <h2>4、商品签收</h2>
      <p><strong>为保证平台和消费者的合法权益，本协议规定自商品签收即表示商品状态良好无损坏。</strong></p>
      <h2>5、提前归还</h2>
      <p>用户可以提前归还商品，<strong>但已按期发生的租赁费用不予退还，</strong>剩余租金费用，租赁公司将按100%的标准退还剩余租金。<strong>剩余租赁期自商品签收日起至商品归还日止。</strong>提前归还器材应当提前至少48小时通知租赁公司。</p>
      <h2>6、器材损坏赔偿</h2>
      <p>用户应当妥善保管租赁的商品，如发生损坏或丢失，用户应当按照租赁公司的要求进行赔偿，具体赔偿标准如下：</p>
      <table>
        <tr>
          <th>损坏程度</th>
          <th>赔偿标准</th>
        </tr>
        <tr>
          <td>轻微损坏（划痕、擦伤等）</td>
          <td>市场价值的10%</td>
        </tr>
        <tr>
          <td>中度损坏（需要维修或更换零件）</td>
          <td>市场价值的30%</td>
        </tr>
        <tr>
          <td>重大损坏或丢失</td>
          <td>市场价值的100%</td>
        </tr>

      </table>
      <p>用户在使用商品时应当注意遵守使用说明，如因操作不当导致的损坏，将会被视作责任方并按照赔偿标准进行赔偿。</p>
      <h2>7、附加条款</h2>
      <p><strong>租立拍相机租赁公司保留对租赁协议的修改权和最终解释权，并在修改租赁协议时应当及时通知用户。如果用户不同意修改后的租赁协议，应当在收到通知后立即停止使用租赁服务。</strong></p>
      <br>
      <br>
      <br>
    </body>
  </html>
</template>

<script>
export default {
  name: 'RentProtocol'
}
</script>

<style scoped>
body {
  background-color:white;
  margin: 0 auto;
  /*border:3px solid deepskyblue;*/
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  width: 100%;
}
h1 {
  color: black;
  text-align: center;
  font-family: SimHei;
  font-size: 30px;
}
h2{
  color: black;
  text-align: left;
  font-family: SimHei;
  font-size: 22px;
  text-indent: 1em;
}
p {
  font-family: SimSun;
  font-size: 20px;
  text-indent: 2em;
}
strong {
  font-family: SimSun;
  font-size: 21px;
  font-weight: 900;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto;
}
td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

</style>
