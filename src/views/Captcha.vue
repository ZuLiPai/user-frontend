<template>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="16">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.login.mobile.verification-code.placeholder')"
          v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
        >
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
      uuid: '',
      captcha: ''
    }
  },
  mounted () {
    this.generateCaptcha()
  },
  methods: {
    async generateCaptcha () {
      this.uuid = uuidv4()
      getCaptcha({ uuid: this.uuid }).then((resp) => {
        // console.log(resp)
        this.captcha = resp.data
      })
    },
    async checkCaptcha (code, callback) {
      console.log('checked captcha: ' + code)
      verifyCaptcha({ uuid: this.uuid, captcha: code }).then((resp) => {
        callback(resp)
      })
    }
  },
  setup () {
    return {
    }
  }
}
</script>
