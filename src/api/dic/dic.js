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

/**
 * 查询所有字典类型
 * @param params
 */
export function queryWmsDicListExtList() {
  return request({
    url: '/dic/wms-dic-list/queryWmsDicListExtList',
    method: 'get'
  })
}
