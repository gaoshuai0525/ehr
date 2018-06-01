/**
 *个人信息 by zhangwei on 2018/4/16.
 */
import request from '@/utils/request'
// 在线调查
export function getOnline() {
  return request({
    url: '/online',
    method: 'get'
  })
}
// 待办事项
export function getBacklog() {
  return request({
    url: '/backlog',
    method: 'get'
  })
}
// 我的消息
export function getMessage() {
  return request({
    url: '/message',
    method: 'get'
  })
}
