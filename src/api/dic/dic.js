import request from '@/utils/request'

/**
 * 初始化字典list
 */
export function initDicList() {
  return request({
    url: '/dic/wms-dic-list/list',
    method: 'get'
  })
}
