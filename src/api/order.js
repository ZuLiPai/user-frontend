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

export function createOrder (data) {
  return request({
    url: `/orders/`,
    method: 'post',
    data
  })
}

export async function updateOrder (id, data) {
  return request({
    url: `/orders/${id}/`,
    method: 'patch',
    data: data
  })
}

export async function getExpressCompany () {
  return request({
    url: `/express/`,
    method: 'get'
  })
}

export async function createExpress (id, data) {
  return request({
    url: `/orders/${id}/express/`,
    method: 'post',
    data: data
  })
}

export async function updateExpress (id, data) {
  return request({
    url: `/orders/${id}/express/`,
    method: 'patch',
    data: data
  })
}
