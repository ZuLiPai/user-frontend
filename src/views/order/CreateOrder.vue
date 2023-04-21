<template>
  <div>
    <a-page-header
      title="创建订单"
      @back="$router.go(-1)"
      style="padding-top: 0"
    />
    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="确认信息" />
        <a-step title="付款" />
        <a-step title="完成" />
      </a-steps>
      <div class="content">
        <step1 :id="itemId" v-if="currentTab === 0" @nextStep="nextStep"/>
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish"/>
      </div>
    </a-card>
  </div>
</template>

<script>
import Step1 from '@/views/order/createSteps/Step1.vue'
import Step2 from '@/views/order/createSteps/Step2.vue'
import Step3 from '@/views/order/createSteps/Step3.vue'

export default {
  name: 'CreateOrder',
  components: {
    Step1,
    Step2,
    Step3
  },
  data () {
    return {
      currentTab: 0,
      // form
      form: null,
      itemId: this.$route.params.itemId
    }
  },
  methods: {

    // handler
    nextStep () {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style scoped>

</style>
