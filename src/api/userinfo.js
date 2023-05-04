import request from '@/utils/request'

export async function getUserInfo (userId) {
  return request({
    url: `users/${userId}/`,
    method: 'get'
  })
}

export async function updateUserInfo (userId, data) {
  return request({
    url: `users/${userId}/`,
    method: 'put',
    data: data
  })
}
