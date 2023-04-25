<template>
  <div style="background:#EAEDF2; padding:30px">
    <a-card :bordered="false" >
      <h2>帮助</h2>
      <p class="text">欢迎使用租立拍相机租赁平台！我们致力于为您提供最好的租赁体验。以下是一些常见问题和答案，以帮助您更好地使用我们的网站。</p><hr>
      <a-list item-layout="horizontal" :data-source="data" size="large">
        <h3 :style="{ margin: '16px 0' }">
        </h3>
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
          >
            <a slot="title" style="font-size: 24px; color: #448ef7">{{ item.title }}</a>
            <a slot="description" style="font-size: 18px; color: black; line-height: 40px" v-html="item.description">{{ item.description }}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <hr>
      <p class="text">我们希望这些常见问题和答案对您有所帮助。如果您有任何其他问题或建议，请随时联系Zulipai团队。</p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'HelpPage',
  setup () {
    const data = [
      {
        title: '1.\t如何注册账户？',
        description: '点击网站右上角的“<a href="">注册</a>”按钮即可进入注册页面。您需要提供您的手机号以及设置密码。<br>注册后，您可以登录并开始浏览和租赁我们的相机等设备。'
      },
      {
        title: '2.\t如何浏览设备？',
        description: '在网站首页，您可以看到我们的设备分类。您可以按照设备类型、品牌、型号等进行筛选。您还可以使用搜索栏查找特定设备。'
      },
      {
        title: '3.\t是否需要缴纳押金？',
        description: '是的，我们需要您缴纳一定的押金作为设备租赁的保证。押金金额会根据设备类型和租赁时间而有所不同。'
      },
      {
        title: '4.\t如何退还押金？',
        description: '押金将在设备归还并经过检查后退还。退还方式将根据您的付款方式进行退款。'
      },
      {
        title: '5.\t如何保证设备质量？',
        description: '我们会在每次设备租赁前对设备进行检查和清洁。如果设备在使用过程中出现任何问题，我们将及时处理。'
      },
      {
        title: '6.\t如何租赁设备？',
        description: '选择您需要租赁的设备，并选择租赁时间。然后，您需要提供您的联系信息和付款方式。我们将在确认您的订单后安排设备的配送。'
      },
      {
        title: '7.\t如何确认设备是否可用？',
        description: '在设备页面上，您可以看到设备的可用日期和时间。如果设备在您需要的时间段内可用，您可以直接下单租赁。'
      },
      {
        title: '8.\t如何支付租赁费用？',
        description: '目前我们只接受支付宝支付，在未来我们会扩充更多的付款渠道。'
      },
      {
        title: '9.\t如何取消订单？',
        description: '如果您需要取消订单，请在我们的网站上登录并访问“我的订单”页面。找到您要取消的订单，并选择“取消订单”。<br>请注意，订单取消可能会产生一定的费用，具体取决于您的租赁时间和设备类型。'
      },
      {
        title: '10.\t否提前归还设备？',
        description: '是的，您可以提前还设备。请在我们的网站上登录并访问“我的订单”页面。找到您要提前还的订单，并选择“提前还设备”。'
      },
      {
        title: '11.\t如何联系客服？',
        description: '如果您有任何问题或需要帮助，可以通过点击“个人中心”--”我的工单”--“发起工单”来进行客服咨询。'
      },
      {
        title: '12.\t设备损坏怎么办？',
        description: '如果设备在使用过程中损坏，请立即联系我们的客服。我们将根据设备损坏情况和租赁合同的条款，为您提供相应的解决方案。'
      },
      {
        title: '13.\t如何修改个人信息？',
        description: '在网站上登录后，您可以进入个人信息页面，并修改您的个人信息，例如联系方式、地址等。'
      },
      {
        title: '14.\t如何查看订单历史？',
        description: '在网站上登录后，您可以进入“我的订单”页面，查看您的订单历史记录。<br>您可以查看订单的详细信息，包括租赁时间、设备信息、订单状态等。'
      }
      ]
    return { data }
  }
}
</script>

<style scoped>
h2{
  font-size: 30px;
  text-align: center;
}
.text{
  font-size: 16px;
  text-align: center;
}
a-list{
  font-size: 64px;
}
</style>
