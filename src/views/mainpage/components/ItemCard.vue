<template>
  <div class="item-card">
    <a-card hoverable style="max-width: 280px; margin: 0 auto;">
      <template #cover>
        <img alt="image" :src="image" width="100" />
      </template>
      <a-card-meta :title="item.name">
        <template #description>
          <a-tag v-for="t in tags" :key="t.id">{{ t.tag_name }}</a-tag>
        </template>
      </a-card-meta>
      <p class="price-container"><span class="price">{{ item.price }}</span> <span class="price-description">元/天起</span></p>
    </a-card>
  </div>
</template>

<script>
import { getTagsByItem } from '@/api/item'
import { getImage } from '@/api/image'

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
    getTagsByItem(this.item.id).then(resp => {
      this.tags = resp
    })
    if (this.item.first_image) {
      getImage(this.item.first_image).then(resp => {
        this.image = resp.url
      })
    } else {
      this.image = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
  }

}
</script>

<style scoped>
p {
  margin-top: 15px;
}
.ant-card .item-card {
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
