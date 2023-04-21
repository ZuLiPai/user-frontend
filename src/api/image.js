import request from '@/utils/request'

export function getImage (id) {
  return request({
    url: `/images/${id}/`,
    method: 'get'
  })
}
