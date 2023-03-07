<template>
  <a-result status="403" title="403" sub-title="抱歉，您没有权限访问此页面">
    <template #extra>
      <a-button type="primary" @click="toHome">
        回到首页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception403',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
