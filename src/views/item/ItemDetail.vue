<template>
  <div class="product-details">
    <a-row :gutter="12">
      <a-col :span="4"></a-col>
      <a-col class="product-image" :span="8">
        <!-- TODO:carousel not working properly -->
        <a-carousel :after-change="onChange">
          <div>
            <img src="../../assets/resources/SonyA7m3.jpeg" alt="product image" style="width: 100%">
          </div>
          <div>
            <img src="../../assets/resources/SonyA7m3.jpeg" alt="product image" style="width: 100%">
          </div>
          <div>
            1
          </div>
        </a-carousel>
      </a-col>
      <a-col class="product-info" :span="8">
        <!-- 商品名称 -->
        <h1 style="font-size: 40px">Sony/索尼A7M3</h1>
        <h1 style="font-size: 20px; color: #999999">全画幅微单数码相机</h1>
        <!-- 商品标签 -->
        <a-tag color="blue">相机</a-tag>
        <a-tag color="orange">索尼</a-tag>
        <a-tag color="purple">风光</a-tag>
        <a-tag color="green">微单</a-tag>
        <!-- TODO:添加chart -->
        <p style="margin-bottom: 100px">租赁价格图</p>
        <!-- TODO:将下面两个按钮下对齐 -->
        <a-row :gutter="12">
          <a-col :span="8">
            <a-button style="width: 100%">收藏</a-button>
          </a-col>
          <a-col :span="16">
            <a-button type="primary" style="width: 100%">立即租赁</a-button>
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
              <a-table :columns="columns" :data-source="data"></a-table>
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

export default {
  components: {
  },
  data () {
    return {
      avatarSrc: 'your-avatar-src',
      columns: [
        { title: '规格1', dataIndex: 'spec1', key: 'spec1' },
        { title: '规格2', dataIndex: 'spec2', key: 'spec2' },
        { title: '规格3', dataIndex: 'spec3', key: 'spec3' }
      ],
      data: [
        { key: '1', spec1: 'value1', spec2: 'value2', spec3: 'value3' },
        { key: '2', spec1: 'value1', spec2: 'value2', spec3: 'value3' }
      ],
      methods: {
        onChange (index) {
          console.log(index)
        }
      },
      value: 3.5
    }
  }
}
</script>

<style>
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
</style>
