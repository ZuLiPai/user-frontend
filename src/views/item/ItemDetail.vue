<template>
  <div class="product-details">
    <a-row :gutter="12">
      <a-col :span="4"></a-col>
      <a-col class="product-image" :span="8">
        <img :src="data.first_image_url" alt="product image" style="width: 100%">
      </a-col>
      <a-col class="product-info" :span="8">
        <!-- 商品名称 -->
        <h1 style="font-size: 40px">{{ data.name }}</h1>
        <h1 style="font-size: 20px; color: #999999">{{ data.type }}</h1>
        <!-- 商品标签 -->
        <a-tag color="blue" v-for="tag in data.tags_item" :key="tag.id">{{ tag.tag_name }}</a-tag>

        <!-- TODO:添加chart -->
        <h1><span class="price-number">{{ data.price }}</span>元/天 起</h1>
        <!-- TODO:将下面两个按钮下对齐 -->
        <a-row :gutter="12">
          <a-col :span="8">
            <a-button style="width: 100%" @click="toggleFavorite">{{ favoriteStatus }}</a-button>
          </a-col>
          <a-col :span="16">
            <a-button type="primary" style="width: 100%" @click="handleOrder">立即租赁</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- 租赁价格图 -->
    <!--      <div class="price-chart">-->
    <!--        &lt;!&ndash; 使用antdv中的echarts组件实现租赁价格图 &ndash;&gt;-->
    <!--        <a-echarts :options="chartOptions"></a-echarts>-->
    <!--      </div>-->
    <!-- 标签组 -->
    <div>
      <a-row>
        <a-col :span="4"></a-col>
        <a-col :span="16">
          <a-tabs style="text-align: center" >
            <!--TODO:使标签占满整个tab-->
            <a-tab-pane key="protocol" tab="协议">
              <img src="../../assets/resources/xuzhi.png" style="width: 400px">
            </a-tab-pane>
            <a-tab-pane key="usage" tab="使用方法">
              <!-- 使用方法内容 -->
            </a-tab-pane>
            <a-tab-pane key="description" tab="说明">
              <!-- 说明内容 -->
            </a-tab-pane>
            <a-tab-pane key="notes" tab="须知">
              <!-- 须知内容 -->
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6"></a-col>
        <a-col :span="16">
          <h2 style="margin-bottom: 10px">用户评价</h2>
          <a-card title="吉米Green" style="width: 80%;">
            <template #extra>
              <a href="#">佳能 Canon 5D Mark IV</a>
            </template>
            <a-rate v-model="value" allow-half disabled></a-rate>
            <p>
              随附的电池续航有点差，一次飞了20分钟就返航了，有些不太尽兴。不过飞机还算比较新
            </p>
          </a-card>
        </a-col>
      </a-row>
      <!-- 介绍、产品规格、样片的标签组 -->
      <a-row>
        <a-col :span="4"></a-col>
        <a-col :span="16">
          <a-tabs style="text-align: center" >
            <a-tab-pane key="introduction" tab="介绍">
              <!-- 介绍内容 -->
            </a-tab-pane>
            <a-tab-pane key="specifications" tab="产品规格">
              <!-- 规格表格 -->
              <a-table :columns="columns" :data-source="data.specs" bordered></a-table>
            </a-tab-pane>
            <a-tab-pane key="samples" tab="样片">
              <!-- 样片图片 -->
              <img src="../../assets/resources/SonyA7m3.jpeg" alt="sample image">
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

import { addFavoriteItem, deleteFavoriteItem, getFavoriteItems, getItemById } from '@/api/item'
import storage from 'store'

export default {
  components: {
  },
  data () {
    return {
      itemId: this.$route.params.id,
      userId: storage.get('user_id'),
      favoriteStatus: '收藏',
      favoriteId: 0,
      avatarSrc: 'your-avatar-src',
      columns: [
        { title: '规格', dataIndex: 'name', key: 'name', align: 'center' },
        { title: '参数', dataIndex: 'value', key: 'value', align: 'center' }
      ],
      data: [],
      methods: {
        onChange (index) {
          console.log(index)
        }
      },
      value: 3.5
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    getItemById(this.itemId).then(resp => {
      this.data = resp
      if (!resp.first_image_url) {
        this.data.first_image_url = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      }
    })
    getFavoriteItems(this.userId).then(resp => {
      // console.log(resp, this.itemId)
      if (resp.find(item => item.item.toString() === this.itemId)) {
        // this.$message.success('已收藏')
        this.favoriteStatus = '已收藏'
        this.favoriteId = resp.find(item => item.item.toString() === this.itemId).id
      }
    })
  },
  methods: {
    toggleFavorite () {
      if (this.favoriteStatus === '已收藏') {
        const data = {
          user: this.userId,
          item: this.favoriteId
        }
        deleteFavoriteItem(data).then(resp => {
          this.$message.success('已取消收藏')
          this.favoriteStatus = '收藏'
        })
      } else {
        const data = {
          user: this.userId,
          item: this.itemId
        }
        addFavoriteItem(data).then(resp => {
          this.$message.success('收藏成功')
          this.favoriteStatus = '已收藏'
          this.favoriteId = resp.id
        })
      }
    },
    handleOrder () {
      // TODO: pass param
      this.$router.push({ name: 'CreateOrder' })
    }
  }
}
</script>

<style scoped>
ant.carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 300px;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
/* 调整tag标签的大小 */
.ant-tag {
  font-size: 15px;
  margin: 5px;
}
.price-number {
  font-size: 40px;
  font-weight: bold;
  color: #ff4d4f;
  margin-right: 10px;
}

</style>
