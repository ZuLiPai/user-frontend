<template>
  <div class="item-card">
    <a-card hoverable style="max-width: 280px; margin: 0 auto;" @click="handleItemDetail(item.id)">
      <template #cover>
        <img alt="image" :src="image" width="100" style="background-size: 100% 100%" />
      </template>
      <a-card-meta :title="item.name">
        <template #description>
          <a-tag v-for="t in item.tags_item" :key="t.id">{{ t.tag_name }}</a-tag>
        </template>
      </a-card-meta>
      <p class="price-container"><span class="price">{{ item.price }}</span> <span class="price-description">元/天起</span></p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tags: [],
      image: ''
    }
  },
  mounted () {
    this.tags = this.tags_item
    if (this.item.first_image_url) {
      this.image = this.item.first_image_url
    } else {
      this.image = 'https://zulipai.oss-cn-beijing.aliyuncs.com/74591665-83ea-46ff-abe0-f7195d8900beicon.png'
    }
  },
  methods: {
    handleItemDetail (id) {
      this.$router.push({ name: 'itemDetail', params: { id: id } })
    }
  }

}
</script>

<style scoped>
p {
  margin-top: 15px;
}
.item-card {
  height: 400px;
  margin-bottom: 20px;
}
.price-container {
  margin-top: 0;
  margin-bottom: 0;
}
.price {
  color: orangered;
  font-size: 20px;
  font-weight: bold;
}
</style>
