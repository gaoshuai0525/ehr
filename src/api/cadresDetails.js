/**
 *干部详情 on 2018/4/24.
 */
import request from '@/utils/request'
// 获取干部详情
export function getCadreDetails(id) {
  return request({
    url: '/info',
    method: 'post',
    data: {id}
  })
}
// 修改干部详情
export function resetCadreDetails(data) {
  return request({
    url: '/reset-cadre-details',
    method: 'post',
    data: data
  })
}
