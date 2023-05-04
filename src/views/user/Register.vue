<template>
  <div class="main user-layout-register">
    <h3><span>{{ $t('user.register.register') }}</span></h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.register.username.placeholder')"
          v-decorator="['username', {rules: [{ required: true, type: 'string', message: $t('user.username.required') }], validateTrigger: ['change', 'blur']}]"
        ><a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/></a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.register.email.placeholder')"
          v-decorator="['email', {rules: [{ required: true, type: 'email', message: $t('user.email.required') }], validateTrigger: ['change', 'blur']}]"
        ><a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/></a-input>
      </a-form-item>
      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">{{ $t(passwordLevelName) }}</div>
            <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
            <div style="margin-top: 10px;">
              <span>{{ $t('user.register.password.popover-message') }}
              </span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            :placeholder="$t('user.register.password.placeholder')"
            v-decorator="['password', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
          ><a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input-password
          size="large"
          :placeholder="$t('user.register.confirm-password.placeholder')"
          v-decorator="['password2', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
        ><a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/></a-input-password>
      </a-form-item>
      <Captcha ref="captchaComponent"></Captcha>
      <!-- TODO: 把图形验证码的判断放到获取短信验证码上：图形验证码不正确则无法获取短信，并在输入栏下提示-->
      <a-form-item>
        <a-input size="large" :placeholder="$t('user.login.mobile.placeholder')" v-decorator="['phone', {rules: [{ required: true, message: $t('user.phone-number.required'), pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">
          <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input size="large" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['code', {rules: [{ required: true, message: $t('user.verification-code.required')}], validateTrigger: ['change', 'blur'] }]">
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-form-item>
            <a-button
              class="getVerificationCode"
              size="large"
              :loading="phoneCodeLoading"
              @click="handleSubmit">
              获取验证码
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-button
      size="large"
      type="primary"
      class="register-button"
      @click="handleFinalSubmit">
      {{ $t('user.register.register') }}
    </a-button>
    <router-link class="login" :to="{ name: 'login' }">{{ $t('user.register.sign-in') }}</router-link>
  </div>
</template>
<script>
import { getSmsCaptcha } from '@/api/login'
import { deviceMixin } from '@/store/device-mixin'
import { scorePassword } from '@/utils/util'
import Captcha from '@/views/Captcha.vue'
import { disableUser, enableUser, registerUser, sendSMS, verifySMS } from '@/api/register'
import { ref } from 'vue'

const levelNames = {
  0: 'user.password.strength.short',
  1: 'user.password.strength.low',
  2: 'user.password.strength.medium',
  3: 'user.password.strength.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
const phoneCodeLoading = ref(false)
export default {
  name: 'Register',
  components: {
    Captcha
  },
  mixins: [deviceMixin],
  data () {
    return {
      form: this.$form.createForm(this),

      state: {
        time: 60,
        level: 0,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false,
      captcha: '',
      phone: '',
      id: '',
      code: '',
      userData: '',
      lastcaptch: ''
      // captchaVerified: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
    /* isButtonDisabled () {
      return !this.phone || !this.captcha || this.state.smsSendBtn
    } */
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      if (!value) {
        return callback()
      }
      if (value.length >= 6) {
        if (scorePassword(value) >= 30) {
          this.state.level = 1
        }
        if (scorePassword(value) >= 60) {
          this.state.level = 2
        }
        if (scorePassword(value) >= 80) {
          this.state.level = 3
        }
      } else {
        this.state.level = 0
        callback(new Error(this.$t('user.password.strength.msg')))
      }
      this.state.passwordLevel = this.state.level
      this.state.percent = this.state.level * 33

      callback()
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error(this.$t('user.password.required')))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(this.$t('user.password.twice.msg')))
      }
      callback()
    },

    handlePhoneCheck (rule, value, callback) {
      const phone = this.form.getFieldValue('phone')
      if (value === undefined) {
        callback(new Error(this.$t('user.phone.required')))
      }
      if (value && phone && value.trim() !== phone.trim()) {
        callback(new Error(this.$t('user.phone-number.wrong-format')))
      }
    },

    handlePasswordInputClick () {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit () {
      console.log(this.form.getFieldValue('phone'))
      const sendData = {
        username: this.form.getFieldValue('username'),
        password: this.form.getFieldValue('password'),
        email: this.form.getFieldValue('email'),
        phone: this.form.getFieldValue('phone')
      }
      const inputCaptcha = this.form.getFieldValue('captcha')
      if (inputCaptcha === this.lastcaptch) {
        this.$message.error('请点击图像验证码获取新验证码')
        return
      }
      this.$refs.captchaComponent.checkCaptcha(inputCaptcha, (result) => {
        if (result.result === true) {
          this.lastcaptch = inputCaptcha
          console.log('This is send data:', sendData)
          registerUser(sendData).then((r) => {
            console.log('注册成功', r)
            this.userData = r
            disableUser(this.userData.id).then(() => {
              console.log('锁定用户了')
              const SMSdata = {
                phone: this.userData.phone,
                id: this.userData.id
              }
              sendSMS(SMSdata).then(() => {
                this.$message.success('验证码发送成功，请注意查收')
                phoneCodeLoading.value = true
              })
            })
          }).catch((r) => {
          console.log('Fail：' + r)
          this.$message.error('出错了，请重新注册')
          })
        } else {
          this.$message.error('图形验证码有误，请重新输入')
        }
      }).catch((r) => console.log('Fail' + r.data))
      // const { form: { validateFields }, state } = this
      // validateFields((err, values) => {
      //   console.log('jin')
      //   if (!err) {
      //     state.passwordLevelChecked = false
      //     this.$refs.captchaComponent.checkCaptcha(values.captcha, (result) => {
      //       if (result.result === true) {
      //         console.log('图形验证码验证成功')
      //         console.log(values)
      //         registerUser(values).then((r) => {
      //           console.log(r.data)
      //           this.id = r.data.id
      //           disableUser(this.id)
      //         }).catch((r) => console.log('Fail' + r))
      //       } else {
      //         this.$message.error('图形验证码有误，请重新输入')
      //       }
      //     })
      //   }
      // })
    },
    handleFinalSubmit () {
      this.code = this.form.getFieldValue('code')
      console.log(this.code)
      if (this.code === '') {
        this.$message.error('请输入验证码')
        return
      }
      if (this.userData === '') {
        this.$message.error('请先完成上方表单内容')
        return
      }
      const codeData = {
        code: this.code,
        phone: this.userData.phone
      }
      console.log('codeData:', codeData)
      verifySMS(codeData).then(() => {
        console.log('验证成功了')
        enableUser(this.userData.id).then(() => {
          // $router.push({ name: '', params: { ...values } })
          console.log('解锁用户了')
          this.$message.success('注册成功！').then(() =>
              this.$router.push({ name: 'registerResult', params: { ...this.userData } })
          )
        })
      })
      .catch((e) => {
        this.$message.error('出错啦', e)
      })
    },
    handleMobileInput () {
      return this.mobile.length === 11
    },
    handleCaptchaInput (e) {
      this.captcha = e.target.value
    },
    async handelCaptchaVerify (res) {
      console.log('handelCaptchaVerify, res', res)
      if (res) {
        const inputCaptcha = this.form.getFieldValue('captcha')
        await this.$refs.captchaComponent.checkCaptcha(inputCaptcha, (result) => {
          console.log(result)
          if (result.result === true) {
            console.log('图形验证码验证成功')
            return result.result
          } else {
            console.log('图形验证码验证失败')
            this.$message.error('图形验证码有误，请重新输入')
            return result.result
          }
        })
      } else {
        console.log('No input')
        this.$message.error('图形验证码有误，请重新输入')
        return false
      }
    },
    getVerificationCode (e) {
      e.preventDefault()
      const { form: { validateFields }, state, $message, $notification } = this

      validateFields(['mobile, captcha'], { force: true },
          (err, values) => {
            if (!err) {
              state.smsSendBtn = true
              const interval = window.setInterval(() => {
                if (state.time-- <= 0) {
                  state.time = 60
                  state.smsSendBtn = false
                  window.clearInterval(interval)
                }
              }, 1000)

              const hide = $message.loading('验证码发送中..', 0)

              getSmsCaptcha({ mobile: values.mobile }).then(res => {
                setTimeout(hide, 2500)
                $notification['success']({
                  message: '提示',
                  description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                  duration: 8
                })
              }).catch(err => {
                setTimeout(hide, 1)
                clearInterval(interval)
                state.time = 60
                state.smsSendBtn = false
                this.requestFailed(err)
              })
            }
          }
      )
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}

</script>
<style lang="less">
.user-register {

  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }

}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {

  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
