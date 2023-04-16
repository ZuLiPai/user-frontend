import request from '@/utils/request'

export function getBulletinList () {
  return request({
    url: '/bulletins/',
    method: 'get'
  })
}
