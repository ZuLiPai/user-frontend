<template>
  <a-row>
    <a-col :sm="24" :md="8">
      <ItemCard/>
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
      userId: storage.get('user_id')
    }
  },
  mounted () {
    console.log('Favorite')
    getFavoriteItems(this.userId).then(resp => {
      console.log(resp)
    })
  }
}
</script>

<style scoped>

</style>
