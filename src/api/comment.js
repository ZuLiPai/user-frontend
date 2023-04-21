import request from '@/utils/request'

export function getComments (id) {
  return request({
    url: `items/${id}/comments/`,
    method: 'get'
  })
}
