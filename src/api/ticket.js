import request from '@/utils/request'

export function getUserTickets (id) {
  return request({
    url: `/users/${id}/tickets/`,
    method: 'get'
  })
}

export function getTicketById (id) {
  return request({
    url: `/tickets/${id}/`,
    method: 'get'
  })
}

export function createTicket (data) {
  return request({
    url: '/tickets/',
    method: 'post',
    data
  })
}

export function closeTicket (id) {
  return request({
    url: `/tickets/${id}/`,
    method: 'patch'
  })
}
