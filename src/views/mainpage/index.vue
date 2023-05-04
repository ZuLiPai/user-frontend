<template>
  <div>
    <div class="ant-pro-page-header-search">
      <a-input-search v-model="searchText" size="large" enter-button="搜索" style="width: 80%; max-width: 522px;" @search="onSearch"/>
    </div>
    <BulletinBoard style="margin-bottom: 20px"/>
    <a-card title="正在促销">
      <a-row :gutter="16">
        <a-col :span="8" v-for="item in promo_items" :key="item.id">
          <ItemCard :item="item"/>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="热卖商品">
      <a-row :gutter="16">
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="item in items"
          :key="item.id">
          <ItemCard :item="item"/>
        </a-col>
      </a-row>
    </a-card>
    <div class="see-more">
      <a-button @click="router().push({name: 'search'})">查看更多</a-button>
    </div>
  </div>
</template>

<script>
import ItemCard from '@/views/mainpage/components/ItemCard.vue'
import BulletinBoard from '@/views/mainpage/components/BulletinBoard.vue'
import router from '@/router'
import { getItems } from '@/api/item'
export default {
  name: 'Index',
  components: {
    ItemCard,
    BulletinBoard
  },
  data () {
    return {
      promo_items: [],
      items: [],
      searchText: ''
    }
  },
  methods: {
    router () {
      return router
    },
    onSearch () {
      this.$router.push({ name: 'search', query: { name: this.searchText } })
    }
  },
  mounted () {
    getItems().then(resp => {
      resp.forEach(item => {
        if (item.promo_status) {
          this.promo_items.push(item)
        }
      })
      this.items = resp.slice(0, 12)
    })
  }
}
</script>

<style scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}

.see-more {
  text-align: center;
  margin-top: 20px;
}
</style>
