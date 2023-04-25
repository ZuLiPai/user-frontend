<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="currentUser.avatarUrl" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay v-if="currentUser.name !== 'Guest'">
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="address" @click="router().push({name: 'Address'})">
          <a-icon type="home" />
          我的地址
        </a-menu-item>
        <a-menu-item v-if="menu" key="orders" @click="handleToOrder">
          <a-icon type="transaction" />
          我的订单
        </a-menu-item>
        <a-menu-item v-if="menu" key="favorite" @click="handleToFavorite">
          <a-icon type="star" />
          我的收藏
        </a-menu-item>
        <a-menu-item v-if="menu" key="ticket" @click="router().push({name: 'Ticket'})">
          <a-icon type="form" />
          我的工单
        </a-menu-item>
        <a-menu-item v-if="menu" key="help" @click="handleToHelp">
          <a-icon type="question-circle" />
          帮助
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t('menu.account.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
    <template v-slot:overlay v-else>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="router().push({name: 'login'})">
          <a-icon type="user" />
          登录
        </a-menu-item>
        <a-menu-item v-if="menu" key="favorite" @click="router().push({name: 'register'})">
          <a-icon type="heart" />
          注册
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import router from '@/router'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    router () {
      return router
    },
    handleToCenter () {
      this.$router.push({ name: 'PersonalInfo' })
    },
    handleToHelp () {
      this.$router.push({ name: 'help' })
    },
    handleToFavorite () {
      this.$router.push({ name: 'Favorite' })
    },
    handleToOrder () {
      this.$router.push({ name: 'Order' })
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'index' })
            location.reload()
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  :deep(.action) {
    margin-right: 8px;
  }
  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
