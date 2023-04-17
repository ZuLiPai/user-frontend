import request from '@/utils/request'

export function getItems (params) {
  return request({
    url: '/items/',
    method: 'get',
    params
  })
}

export function getTags () {
  return request({
    url: '/tags/',
    method: 'get'
  })
}

export function getTagsByItem (id) {
  return request({
    url: `items/${id}/tags/`,
    method: 'get'
  })
}
