<template>
  <div class="ticket-detail">
    <h1>Ticket Detail</h1>
  </div>
</template>

<script>
import storage from 'store'
import { getTicketById } from '@/api/ticket'

export default {
  name: 'TicketDetail',
  data () {
    return {
      userId: storage.get('user_id'),
      ticketId: this.$route.params.id,
      ticketInfo: null
    }
  },
  methods: {

  },
  mounted () {
    getTicketById(this.ticketId).then(res => {
      this.ticketInfo = res
    })
    // TODO: Write TicketDetail
  }
}
</script>

<style scoped>

</style>
