<template>
  <a-carousel :autoplay="true">
    <div v-for="bulletin in bulletins" :key="bulletin.id" style="height: 200px">
      <img :src="bulletin.image" alt="image" style="object-fit: contain; height: 100%; margin: 0 auto;"/>
    </div>
  </a-carousel>
</template>

<script>
import { getBulletinList } from '@/api/bulletin'
import { getImage } from '@/api/image'

export default {
  name: 'BulletinBoard',
  methods: {
    imgUrl (id) {
      getImage(id).then(resp => {
        return resp.url
      })
    }
  },
  mounted () {
    getBulletinList().then(resp => {
      this.bulletins = resp
      this.bulletins.forEach(bulletin => {
        getImage(bulletin.image).then(resp => {
          bulletin.image = resp.url
        })
      })
      console.log(this.bulletins)
    })
  },
  data () {
    return {
      bulletins: []
    }
  }
}
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  /*height: 160px;*/
  /*line-height: 160px;*/
  /*background: #364d79;*/
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
