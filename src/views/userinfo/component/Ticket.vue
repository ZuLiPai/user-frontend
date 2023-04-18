<template>
  <div>
    <a-button type="primary" style="margin-bottom: 15px" @click="router().push({name: 'CreateTicket'})">发起工单</a-button>
    <a-table :columns="columns" :data-source="data">
      <span slot="status" slot-scope="status">
        <a-tag
          :color="status === false ? 'red' : 'green'"
        >
          {{ status === false ? '工单开启中' : '工单已关闭' }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="record">
        <a>查看详情</a>
        <a-divider type="vertical"/>
        <a-popconfirm
          title="确定要关闭该工单吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleClose(record.key)"
        >
          <a>关闭工单</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import router from '@/router'
import storage from 'store'
import { closeTicket, getUserTickets } from '@/api/ticket'

const columns = [
  {
    title: '工单编号',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: '工单标题',
    dataIndex: 'ticket_title',
    key: 'ticket_title'
  },
  {
    title: '状态',
    key: 'ticket_status',
    dataIndex: 'ticket_status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Ticket',
  methods: {
    router () {
      return router
    },
    handleClose (key) {
      closeTicket(key).then(resp => {
        this.$message.success('关闭工单成功')
        this.refreshTickets()
      })
    },
    refreshTickets () {
      getUserTickets(this.userId).then(resp => {
        this.data = resp
        this.data.forEach(item => {
          item.key = item.ticket_id
        })
      })
    }
  },
  data () {
    return {
      userId: storage.get('user_id'),
      data: [],
      columns
    }
  },
  mounted () {
    this.refreshTickets()
  }
}
</script>

<style scoped>

</style>
