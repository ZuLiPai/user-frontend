import request from '@/utils/request'
export function getCaptcha (param) {
  return request({
    url: '/captcha/',
    method: 'post',
    data: {
      uuid: param.uuid
    }
  })
}

export function verifyCaptcha (param) {
  return request({
    url: '/captcha/verify/',
    method: 'post',
    params: {
      uuid: param.uuid,
      code: param.captcha
    }
  })
}
