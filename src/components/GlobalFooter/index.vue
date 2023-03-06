<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      Design and developed by ZuLiPai team, based on <a
        href="https://www.github.com/vueComponent/pro-layout"
        target="_blank">Pro Layout</a> and <a
          href="https://www.github.com/vueComponent/ant-design-vue-pro"
          target="_blank">ant-design-vue-pro</a>.
      Thank <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a>
    </template>
    <template v-slot:copyright>
      <!--      <a href="https://github.com/vueComponent" target="_blank">vueComponent</a>-->
      <a href="http://zulipai.shop" target="_blank" style="margin-left: 40px;">租立拍相机租赁</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>

<style scoped>
a {
  margin: 0 0 0 0 !important;
}
</style>
