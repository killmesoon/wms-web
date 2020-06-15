import request from '@/utils/request'

/**
 * 获取自动编码
 * @param data
 */
export function getDocNumber(id) {
  return request({
    url: '/doc/getDocNumber/' + id,
    method: 'get'
  })
}
