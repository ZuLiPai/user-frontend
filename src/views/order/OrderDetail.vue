<template>
  <page-header-wrapper
    title="订单编号：234231029431"
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <template v-slot:content>
      <a-descriptions size="small" :column="isMobile ? 1 : 2">
        <a-descriptions-item label="收货人">库北</a-descriptions-item>
        <a-descriptions-item label="产品">索尼 A7M4</a-descriptions-item>
        <a-descriptions-item label="创建时间">2017-07-07</a-descriptions-item>
        <a-descriptions-item label="收货地址">北京市朝阳区平乐园100号北京工业大学</a-descriptions-item>
        <a-descriptions-item label="租赁日期">2017-07-07 ~ 2017-08-08</a-descriptions-item>
        <a-descriptions-item label="租赁天数">14天</a-descriptions-item>
        <a-descriptions-item label="支付方式">支付宝</a-descriptions-item>
        <a-descriptions-item label="押金金额">18000元</a-descriptions-item>
        <a-descriptions-item label="租金金额">200元</a-descriptions-item>
      </a-descriptions>
    </template>
    <template>
      <a-row style="max-width: 90%; margin: 0 auto">
        <a-col :span="8">
          <a-card class="cardstyle">
            <a-steps progress-dot="true" :current="3" direction="vertical">
              <a-popover slot="progressDot" slot-scope="{ index, status, prefixCls }">
                <template slot="content">
                  <span>step {{ index }} status: {{ status }}</span>
                </template>
                <span :class="`${prefixCls}-icon-dot`"/>
              </a-popover>
              <a-step title="已付款" subTitle="" description="等待租立拍发货"/>
              <a-step title="已发货" description="快递单号为123918748320942请耐心等待"/>
              <a-step title="租赁中" description="截止日期为2023-3-1"/>
              <a-step title="待归还" description="请在规定时间内归还;若已发货请填写快递单号"/>
              <a-step title="验机中" description="租立拍正在检查机器状态"/>
              <a-step title="订单完成" description="订单已完成，欢迎下次租赁"/>
            </a-steps>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card class="cardstyle" title="注意事项">
            <h3>取消订单</h3>
            <p>
              用户可以在每日17点发货前 <a-popconfirm
                title="确定要取消订单？取消后不可恢复！"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirm"
                @cancel="cancel"
              >
                <a href="#">取消订单</a>
              </a-popconfirm>，并全额退还费用。如在平台发货后取消订单，将会被收取订单总额的30%作为违约金。</p>
            <h3>商品签收</h3>
            <p>为保证平台和消费者的合法权益，<a>平台协议</a>规定自商品签收即表示商品状态良好无损坏。</p>
            <h3>商品归还</h3>
            <p>租赁到期后，请及时联系快递公司发货归还商品，并在发货后<a href="/return">在此</a>填写相关快递信息。</p>
            <h3>器材损坏赔偿</h3>
            <p>用户应当妥善保管租赁的器材，如发生损坏或丢失，用户应当按照租赁公司的要求进行赔偿，具体赔偿标准见<a>协议</a>。
            </p>
            <br>
            <p>
              租赁公司保留对租赁协议的修改权，并在修改租赁协议时应当及时通知用户。如果用户不同意修改后的租赁协议，应当在收到通知后立即停止使用租赁服务。</p>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'OrderDetail',
  mixins: [baseMixin],
  data () {
    return {
      tabList: [
        { key: 'detail', tab: '详情' }
      ],
      tabActiveKey: 'detail',

      methods: {
        handleTabChange (key) {
          console.log('')
          this.tabActiveKey = key
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}

.text {
  color: rgba(0, 0, 0, .45);
}

.heading {
  color: rgba(0, 0, 0, .85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, .25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.cardstyle {
  height: 15cm;
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }

  .text {

  }

  .status-list {
    text-align: left;
  }
}
</style>
