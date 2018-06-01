/**
 * 首页API
 * @author zhangwei
 * @date 2018/4/3
 */
import request from '@/utils/request'
export function dashboard() {
  return request({
    url: '/dashboard',
    method: 'post'
  })
}
