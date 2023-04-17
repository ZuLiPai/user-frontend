<template>
  <div>
    <div class="ant-pro-page-header-search">
      <a-input-search size="large" enter-button="搜索" style="width: 80%; max-width: 522px;"/>
    </div>
    <BulletinBoard style="margin-bottom: 20px"/>
    <a-card title="正在促销">
      <a-row :gutter="16">
        <a-col :span="8">
          <ItemCard/>
        </a-col>
        <a-col :span="8">
          <ItemCard/>
        </a-col>
        <a-col :span="8">
          <ItemCard/>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <a-row :gutter="16">
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <ItemCard/>
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
export default {
  name: 'Index',
  components: {
    ItemCard,
    BulletinBoard
  },
  methods: {
    router () {
      return router
    },
    onSearch (value) {
      console.log(value)
    }
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
  margin-bottom: 16px;
  margin-top: 20px;
}
</style>
