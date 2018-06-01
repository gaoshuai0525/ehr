/**
 *干部审核 by zhangwei on 2018/4/27.
 */
import request from '@/utils/request'
// 获取干部详情
export function getCadreAudit() {
  return request({
    url: '/cadre-audit',
    method: 'post'
  })
}
