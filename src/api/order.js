import request from '@/utils/request'

export function getOrdersByUserId (id) {
  return request({
    url: `/users/${id}/orders/`,
    method: 'get'
  })
}

export function getOrderDetail (id) {
  return request({
    url: `/orders/${id}/`,
    method: 'get'
  })
}
