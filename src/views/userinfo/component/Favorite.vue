<template>
  <a-row>
    <a-col>
      <a-empty v-if="data.length === 0"/>
    </a-col>
    <a-col :sm="24" :lg="8" :md="12" v-for="item in data" :key="item.id">
      <ItemCard :item="item.item_detail"/>
    </a-col>
  </a-row>
</template>

<script>
import ItemCard from '@/views/mainpage/components/ItemCard.vue'
import storage from 'store'
import { getFavoriteItems } from '@/api/item'
import { Empty as AEmpty } from 'ant-design-vue'

export default {
  components: {
    ItemCard,
    AEmpty
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
