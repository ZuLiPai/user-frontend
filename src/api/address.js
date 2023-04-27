import request from '@/utils/request'

export function getUserAddresses (id) {
  return request({
    url: `/users/${id}/addresses/`,
    method: 'get'
  })
}

export function updateAddress (userId, addressId, data) {
  return request({
    url: `/users/${userId}/addresses/${addressId}/`,
    method: 'patch',
    data: data
  })
}

export function addAddress (userId, data) {
  return request({
    url: `/users/${userId}/addresses/`,
    method: 'post',
    data: data
  })
}

export function deleteAddress (userId, addressId) {
  return request({
    url: `/users/${userId}/addresses/${addressId}/`,
    method: 'delete'
  })
}

export function getAddressById (userId, addressId) {
  return request({
    url: `/users/${userId}/addresses/${addressId}`,
    method: 'get'
  })
}
