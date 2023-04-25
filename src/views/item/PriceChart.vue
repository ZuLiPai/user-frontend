<template>
  <div>
    <a-card style="max-width: 800px; margin: 0 auto">
      <div id="price-chart" style="height: 300px; max-width: 800px; margin: 0 auto"/>
    </a-card>
  </div>

</template>

<script>
import * as echarts from 'echarts'
function genPrice (price) {
  const data = {
    label: [],
    value: []
  }
  let i
  for (i = 1; i <= 14; i++) {
    data.label.push(`第${i}天`)
    if (i >= 1 && i <= 3) {
      data.value.push(price * 1.00)
    } else if (i >= 4 && i <= 7) {
      data.value.push(price * 0.8)
    } else if (i >= 8 && i <= 14) {
      data.value.push(price * 0.5)
    }
  }
  return data
}
export default {
  name: 'PriceChart',
  data () {
    return {
      price: 0
    }
  },
  methods: {
    loadChart (price) {
      this.price = price
      const chartDom = document.getElementById('price-chart')
      const option = {
        title: {
          text: '日租赁价格'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['价格']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '价格',
            type: 'line',
            step: 'start',
            data: [],
            markLine: {
              data: [{
                name: '租赁1-3日价格',
                yAxis: this.price
              }, {
                name: '租赁4-7日价格',
                yAxis: this.price * 0.8
              }, {
                name: '租赁8-14日价格',
                yAxis: this.price * 0.5
              }]
            }
          }
        ]
      }
      const d = genPrice(this.price)
      option.series[0].data = d.value
      option.xAxis.data = d.label
      const myChart = echarts.init(chartDom)
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
