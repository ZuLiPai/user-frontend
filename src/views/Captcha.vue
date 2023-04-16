<template>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="16">
      <a-form-item>
        <a-input size="large" type="text" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
    </a-col>
    <a-col class="gutter-row" id="captcha" :span="8">
      <img :src="'data:image/png;base64,'+captcha" @click="generateCaptcha" width="100%" alt="captcha"/>
    </a-col>
  </a-row>
</template>

<script>
import { getCaptcha, verifyCaptcha } from '@/api/captcha'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Captcha',
  data () {
    return {
      captcha: ''
    }
  },
  mounted () {
    this.generateCaptcha()
  },
  methods: {
    async generateCaptcha () {
      const uuid = uuidv4()
      getCaptcha({ uuid: uuid }).then((resp) => {
        // console.log(resp)
        this.captcha = resp.data
      })
    },
    async verifyCaptcha (captcha) {
      const uuid = uuidv4()
      verifyCaptcha({ uuid: uuid, captcha: captcha }).then((resp) => {
        // console.log(resp)
        return resp.data
      })
    }
  },
  setup () {
    return {
    }
  }
}
</script>
