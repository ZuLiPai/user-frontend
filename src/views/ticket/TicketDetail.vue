<template>
  <div>
    <a-card>
      <a-row>
        <a-col>
          <h2>工单标题：{{ ticketInfo.ticket_title }}</h2>
        </a-col>
      </a-row>
      <a-row justify="space-between">
        <a-col flex>
          <h2>工单状态：
            <a-tag
              :color="ticketInfo.ticket_status === false ? 'red' : 'green'"
            >
              {{ ticketInfo.ticket_status === false ? '工单开启中' : '工单已关闭' }}
            </a-tag>
          </h2>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <h2>工单信息</h2>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <div v-for="message in ticketInfo.ticket_messages" :key="message.id">
            <a-card
              :title="message.isCustomer === true ? '用户' : '客服'"
              style="width: 100%; margin-bottom: 20px"
            >
              <template #extra>
                <span>{{ message.ticket_message_date }}</span>
              </template>
              <p>
                {{ message.ticket_message }}
              </p>
            </a-card>
          </div>
        </a-col>
      </a-row>
      <div v-if="ticketInfo.ticket_status === false" style="margin-top: 10px">
        <a-row>
          <a-col :span="24">
            <a-textarea
              placeholder="在此输入回复工单内容"
              :rows="10"
              show-count="true"
              v-model="replyText"
            />
          </a-col>
        </a-row>
        <a-row style="margin-top: 20px;" :gutter="16">
          <a-col :span="18">
            <a-button type="primary" style="width: 100%;" @click="handleSubmit">
              回复工单
            </a-button>
          </a-col>
          <a-col :span="6">
            <a-button type="danger" style="width: 100%" @click="handleClose">
              关闭工单
            </a-button>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import storage from 'store'
import { closeTicket, createTicketMessage, getTicketById } from '@/api/ticket'
import router from '@/router'

export default {
  name: 'TicketDetail',
  data () {
    return {
      userId: storage.get('user_id'),
      ticketId: this.$route.params.id,
      ticketInfo: null,
      replyText: ''

    }
  },
  methods: {
    handleSubmit () {
      if (!this.replyText) {
        this.$message.warn('回复内容不能为空')
        return
      }
      const data = {
        ticket_message: this.replyText,
        isCustomer: true
      }
      createTicketMessage(this.ticketId, data).then(() => {
        this.replyText = ''
        this.$message.success('回复成功')
        this.refreshDetail()
      })
    },
    handleClose () {
      closeTicket(this.ticketId).then(() => {
        this.$message.success('工单已关闭')
        router.go(-1)
      })
    },
    refreshDetail () {
      getTicketById(this.ticketId).then(res => {
        this.ticketInfo = res
      })
    }
  },
  mounted () {
    this.refreshDetail()
  }
}
</script>

<style scoped>

</style>
