<template>
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
        <a-button v-if="Number(data.status) === 1" type="primary" @click="showConfirm(checkedOrderBtn)">签收商品</a-button>
        <a-button v-if="Number(data.status) === 2" type="primary" @click="router.push({name: 'ReturnOrder', params: {id : orderId}})">归还商品</a-button>
        <a-button v-if="Number(data.status) === 6" type="primary" >评价商品</a-button>
      </a-button-group>
      <a-button type="danger" @click="handleTicket">发起工单</a-button>
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
          <a-card title="订单进度">
            <a-steps progress-dot="true" :current="data.status">
              <a-step title="已付款" subTitle="租立拍即将发货"/>
              <a-step title="已发货" subTitle="快递已发出请耐心等待" :description="this.expressText1"/>
              <a-step title="租赁中" subTitle="尽情享受设备吧" :description="'归还日期:' + data.expect_end_time"/>
              <a-step title="归还中" subTitle="请按预期时间归还" :description="this.expressText2"/>
              <a-step title="验机中" subTitle="租立拍正在验机" :description="'验机完成后将退还押金'"/>
              <a-step title="订单完成" subTitle="订单已完成" description="欢迎下次租赁"/>
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
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import storage from 'store'
import { getOrderDetail, updateExpress, updateOrder } from '@/api/order'
import router from '@/router'
export default {
  name: 'OrderDetail',
  mixins: [baseMixin],
  data () {
    return {
      orderId: this.$route.params.id,
      userId: storage.get('user_id'),
      data: {},
      router,
      expressText1: '',
      expressText2: ''
    }
  },
  mounted () {
    getOrderDetail(this.orderId).then(resp => {
      this.data = resp
      this.handleExpress(this.data.express_data)
    })
  },
  methods: {
    onConfirm () {},
    handleTicket () {
      this.$router.push({ name: 'CreateTicket' })
    },
    async checkedOrderBtn () {
      // 获取当前时间
      const currentDateTime = new Date()
      const year = currentDateTime.getFullYear()
      const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2)
      const day = ('0' + currentDateTime.getDate()).slice(-2)
      const hour = ('0' + currentDateTime.getHours()).slice(-2)
      const minute = ('0' + currentDateTime.getMinutes()).slice(-2)
      const second = ('0' + currentDateTime.getSeconds()).slice(-2)
      const datetime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      const data = {
        id: this.orderId,
        status: '2',
        expect_end_time: this.data.expect_end_time,
        expect_start_time: this.data.expect_start_time,
        actual_start_time: datetime
      }
      // 更新订单
      updateOrder(this.orderId, data).then(() => {
        const updateExpressData = {
          order_express_id: this.data.express_data[0].order_express_id,
          express_order: this.data.express_data[0].express_order,
          express_name_id: this.data.express_data[0].express_name_id,
          express_number: this.data.express_data[0].express_number,
          express_kind: this.data.express_data[0].express_kind,
          express_status: true
        }
        // 更新快递
        updateExpress(this.orderId, updateExpressData).then(() => {
          this.$message.success('签收成功')
          // 刷新页面
          getOrderDetail(this.orderId).then(resp => {
            this.data = resp
          })
        })
      }).catch(() => {
        this.$message.error('出错了，请重试！')
      })
    },
    handleExpress (data) {
      data.forEach((t) => {
        if (t.express_kind === false) {
          this.expressText1 = t.express_name + ':' + t.express_number
        } else {
          this.expressText2 = t.express_name + ':' + t.express_number
        }
      })
    },
    returnOrderBtn () {
      // Router to return modal
      this.$message.info('return')
      this.expressVisible = true
    },
    showConfirm (callback) {
      this.$confirm({
        title: '签收商品',
        content: '确认已收到商品，并且商品能够正常使用，订单将进入租赁状态',
        onOk () {
          return new Promise((resolve, reject) => {
            callback().then(r => {
              return new Promise(resolve)
            })
          }).catch(() => console.log('出错啦!'))
        },
        onCancel () {}
      })
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
