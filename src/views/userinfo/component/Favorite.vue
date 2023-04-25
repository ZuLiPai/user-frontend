<template>
  <a-row>
    <a-col :sm="24" :lg="8" :md="12" v-for="item in data" :key="item.id">
      <ItemCard :item="item.item_detail"/>
    </a-col>
  </a-row>
</template>

<script>
import ItemCard from '@/views/mainpage/components/ItemCard.vue'
import storage from 'store'
import { getFavoriteItems } from '@/api/item'

export default {
  components: {
    ItemCard
  },
  name: 'Favorite',
  data () {
    return {
      userId: storage.get('user_id'),
      data: []
    }
  },
  mounted () {
    getFavoriteItems(this.userId).then(resp => {
      this.data = resp
    })
  }
}
</script>

<style scoped>

</style>
