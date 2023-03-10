<template>
  <a-row>
    <a-col :sm="24" :md="8">
      <ItemCard/>
    </a-col>
    <a-col :sm="24" :md="8">
      <ItemCard/>
    </a-col>
    <a-col :sm="24" :md="8">
      <ItemCard/>
    </a-col>
    <a-col :sm="24" :md="8">
      <ItemCard/>
    </a-col>
    <a-col :sm="24" :md="8">
      <ItemCard/>
    </a-col>
  </a-row>
</template>

<script>
import ItemCard from '@/views/mainpage/components/ItemCard.vue'

export default {
  components: {
    ItemCard
  },
  name: 'Favorite'
}
</script>

<style scoped>

</style>
