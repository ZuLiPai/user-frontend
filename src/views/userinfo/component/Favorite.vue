<template>
  <a-row>
    <a-col :span="8">
      <ItemCard></ItemCard>
    </a-col>
    <a-col :span="8">
      <ItemCard></ItemCard>
    </a-col>
    <a-col :span="8">
      <ItemCard></ItemCard>
    </a-col>
    <a-col :span="8">
      <ItemCard></ItemCard>
    </a-col>
    <a-col :span="8">
      <ItemCard></ItemCard>
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
