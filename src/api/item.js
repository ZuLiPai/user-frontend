import request from '@/utils/request'

export function getItems (params) {
  return request({
    url: '/items/',
    method: 'get',
    params
  })
}

export function getItemById (id) {
  return request({
    url: `/items/${id}/`,
    method: 'get'
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

export function getFavoriteItems (id) {
  return request({
    url: `/users/${id}/favorites/`,
    method: 'get'
  })
}

export function addFavoriteItem (data) {
  return request({
    url: `/users/${data.user}/favorites/`,
    method: 'post',
    data
  })
}

export function deleteFavoriteItem (data) {
  return request({
    url: `/users/${data.user}/favorites/${data.item}/`,
    method: 'delete'
  })
}
