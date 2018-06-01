import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/FilterTable/list',
    method: 'get',
    params
  })
}
