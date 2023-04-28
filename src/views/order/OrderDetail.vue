<template>
  <div>
    <page-header-wrapper
      :title="'订单编号：' + data.id"
    >
      <template v-slot:content>
        <a-descriptions size="small" :column="isMobile ? 1 : 2">
          <a-descriptions-item label="收货人">{{ data.address_detail.name }}</a-descriptions-item>
          <a-descriptions-item label="产品">{{ data.item_name }}</a-descriptions-item>
          <a-descriptions-item label="创建时间">{{ data.create_time }}</a-descriptions-item>
          <a-descriptions-item label="收货地址">{{ data.address_detail.address }}</a-descriptions-item>
          <a-descriptions-item label="租赁日期">{{ data.expect_start_time }} ~ {{ data.expect_end_time }}</a-descriptions-item>
          <a-descriptions-item label="租赁天数">14天</a-descriptions-item>
          <a-descriptions-item label="支付方式">{{ data.finance_order[0].payment }}</a-descriptions-item>
        </a-descriptions>
      </template>

      <template v-slot:extra>
        <a-button-group style="margin-right: 10px;">
          <a-button>签收商品</a-button>
          <a-button>归还商品</a-button>
          <a-button @click="handleComment">评论</a-button>
        </a-button-group>
        <a-button type="primary" @click="handleTicket">发起工单</a-button>
      </template>

      <template v-slot:extraContent>
        <a-row class="status-list">
          <a-col :xs="12" :sm="12">
            <div class="text">押金金额</div>
            <div class="heading">¥ {{ data.finance_order[0].deposit }}</div>
          </a-col>
          <a-col :xs="12" :sm="12">
            <div class="text">租金金额</div>
            <div class="heading">¥ {{ data.finance_order[0].price }}</div>
          </a-col>
        </a-row>
      </template>

      <template>
        <a-row style="max-width: 90%; margin: 0 auto">
          <a-col :span="24" style="margin-bottom: 20px">
            <a-card>
              <a-steps progress-dot="true" :current="data.status">
                <a-step title="已付款" subTitle="" description="等待租立拍发货"/>
                <a-step title="已发货" description="快递单号为请耐心等待"/>
                <a-step title="租赁中" description="截止日期为2023-3-1"/>
                <a-step title="待归还" description="请在规定时间内归还;若已发货请填写快递单号"/>
                <a-step title="验机中" description="租立拍正在检查机器状态"/>
                <a-step title="订单完成" description="订单已完成，欢迎下次租赁"/>
              </a-steps>
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card title="注意事项">
              <h3>取消订单</h3>
              <p>
                用户可以在每日17点发货前 <a-popconfirm
                  title="确定要取消订单？取消后不可恢复！"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="onConfirm"
                >
                  <a href="#">取消订单</a>
                </a-popconfirm>，并全额退还费用。如在平台发货后取消订单，将会被收取订单总额的30%作为违约金。</p>
              <h3>商品签收</h3>
              <p>为保证平台和消费者的合法权益，<a>平台协议</a>规定自商品签收即表示商品状态良好无损坏。</p>
              <h3>商品归还</h3>
              <p>租赁到期后，请及时联系快递公司发货归还商品，并在发货后填写相关快递信息。</p>
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
    <a-modal v-model="visibleComment" title="评价商品" @ok="handleSubmitComment">
      <a-row style="margin-bottom: 20px;">
        <a-col :span="3">
          评分：
        </a-col>
        <a-col :span="21">
          <rate v-model="commentStar"/>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="3">
          评价：
        </a-col>
        <a-col :span="21">
          <a-textarea
            placeholder="留下友善的评价"
            :auto-size="{ minRows: 5, maxRows: 10 }"
            v-model="commentText"
          />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import storage from 'store'
import { getOrderDetail } from '@/api/order'
import { Rate } from 'ant-design-vue'
import { createComment } from '@/api/comment'

export default {
  name: 'OrderDetail',
  components: {
    Rate
  },
  mixins: [baseMixin],
  data () {
    return {
      orderId: this.$route.params.id,
      userId: storage.get('user_id'),
      data: {},
      visibleComment: false,
      commentStar: null,
      commentText: ''
    }
  },
  methods: {
    onConfirm () {},
    handleTicket () {
      this.$router.push({ name: 'CreateTicket' })
    },
    handleComment () {
      // TODO: 只在订单完成之后评论
      this.visibleComment = true
    },
    handleSubmitComment () {
      if (this.commentStar && this.commentText) {
        const data = {
          order: this.orderId,
          user: this.userId,
          item: this.data.item,
          rating: this.commentStar,
          content: this.commentText
        }
        createComment(this.data.item, data).then(resp => {
          this.$message.success('评价成功')
          this.visibleComment = false
        })
      } else {
        this.$message.warning('请填写评价内容')
      }
    }
  },
  mounted () {
    getOrderDetail(this.orderId).then(resp => {
      this.data = resp
    })
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
