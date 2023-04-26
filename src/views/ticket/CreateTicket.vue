<template>
  <div>
    <a-row style="max-width: 90%; margin: 0 auto">
      <a-col :span="24">
        <a-card>
          <h1 style="font-size: 28px">工单系统</h1>
          <h3>遇到了问题？请先<a @click="router().push({name: 'help'})">查看帮助</a></h3>
          <a-divider/>
          <h4>新建工单：</h4>
          <a-form>
            <a-form-item
              label="标题"
              name="title"
            >
              <a-input v-model="ticketTitle"/>
            </a-form-item>
            <a-form-item name="text" label="内容" >
              <a-textarea
                :auto-size="{ minRows: 5, maxRows: 10 }"
                v-model="ticketMessage"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" @click="handleSubmit" :loading="loading">提交</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import storage from 'store'
import { createTicket } from '@/api/ticket'
import router from '@/router'

export default {
  name: 'CreateTicket',
  data () {
    return {
      userId: storage.get('user_id'),
      ticketTitle: '',
      ticketMessage: '',
      loading: false
    }
  },
  methods: {
    router () {
      return router
    },
    handleSubmit () {
      if (!this.ticketMessage && !this.ticketMessage) {
        this.$message.error('请填写工单标题和内容')
        return
      }
      this.loading = true
      const data = {
        ticket_user: this.userId,
        ticket_title: this.ticketTitle,
        ticket_message: this.ticketMessage,
        isCustomer: true
      }
      createTicket(data).then(res => {
        this.$message.success('工单创建成功，3秒后跳转到工单列表')
        setTimeout(() => {
          this.loading = false
          router.push({ name: 'Ticket' })
        }, 3000)
      })
    }
  }
}

</script>

<style scoped>

</style>
