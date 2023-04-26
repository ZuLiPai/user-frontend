import request from '@/utils/request'

export async function registerUser (data) {
  return request({
    url: `/users/register/`,
    method: 'post',
    data: data
  })
}

export async function enableUser (id) {
  return request({
    url: `/users/${id}/enable/`,
    method: 'get'
  })
}

export async function disableUser (id) {
  return request({
    url: `/users/${id}/disable/`,
    method: 'get'
  })
}

export async function sendSMS (data) {
  return request({
    url: `/auth/code/`,
    method: 'post',
    data: data
  })
}

export async function verifySMS (data) {
  return request({
    url: `/auth/code/verify/`,
    method: 'post',
    data: data
  })
}
