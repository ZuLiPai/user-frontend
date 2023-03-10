<template>
  <div>
    <a-button type="primary" @click="showModal">
      Open Modal
    </a-button>
    <a-modal
      @ok="handleOk"
      title="发布评论"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel">
      <add-comment-modal/>
    </a-modal>
  </div>
</template>

<script>
import AddCommentModal from '@/views/comment/components/AddCommentModal.vue'
export default {
  name: 'AddComment',
  components: {
    AddCommentModal
  },
  data () {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
