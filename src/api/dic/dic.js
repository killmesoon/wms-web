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

/**
 * typeId查询字典列表
 * @param typeId
 */
export function queryWmsDicListByDicTypeId(typeId) {
  return request({
    url: '/dic/wms-dic-list/queryWmsDicListByDicTypeId/' + typeId,
    method: 'get'
  })
}

/**
 * 更新状态
 * @param data
 */
export function saveOrUpdateWmsDic(data) {
  return request({
    url: '/dic/wms-dic-list/saveOrUpdateWmsDic',
    method: 'post',
    data
  })
}
