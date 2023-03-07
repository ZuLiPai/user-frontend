<template>
  <div>
    <a-input-search
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
      style="margin-bottom: 20px"
    />
    <BulletinBoard style="margin-bottom: 20px"/>
    <a-card title="正在促销">
      <a-row>
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
        <a-col :span="6">
          <ItemCard></ItemCard>
        </a-col>
        <a-col :span="6">
          <ItemCard></ItemCard>
        </a-col>
        <a-col :span="6">
          <ItemCard></ItemCard>
        </a-col>
        <a-col :span="6">
          <ItemCard></ItemCard>
        </a-col>
        <a-col :span="6">
          <ItemCard></ItemCard>
        </a-col>
        <a-col :span="6">
          <ItemCard></ItemCard>
        </a-col>
      </a-row>
    </a-card>
    <a-row>
      <a-col>
        <a-button>查看更多</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ItemCard from '@/views/mainpage/components/ItemCard.vue'
import BulletinBoard from '@/views/mainpage/components/BulletinBoard.vue'
export default {
  name: 'Index',
  components: {
    ItemCard,
    BulletinBoard
  },
  methods: {
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
