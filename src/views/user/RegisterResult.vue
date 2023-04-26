<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="username"
    :sub-title="description">

    <template #extra>
      <a-button size="large" type="primary" @click="goLoginHandle">前往登录</a-button>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>

  </a-result>
</template>

<script>
export default {
  name: 'RegisterResult',
  data () {
    return {
      description: '租立拍已为您精心准备了不少商品，快去登录查看需要的设备吧！',
      form: {}
    }
  },
  computed: {
    username () {
      const v = this.form && this.form.username || 'xxx'
      return `您的账户：${v} 注册成功`
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goLoginHandle () {
      this.$router.push({ name: 'login' })
    },
    goHomeHandle () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>

</style>
