/**
 *干部筛选 on 2018/4/23.
 */
import request from '@/utils/request'
export function getCadreSelect(query) {
  return request({
    url: '/cadre-select',
    method: 'post',
    data: query
  })
}
