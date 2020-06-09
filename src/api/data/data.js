import request from "@/utils/request"

/**
 * 查询物料list
 * @param params
 * @param data
 * @returns {AxiosPromise}
 */
export function getItemList(params, data) {
  return request({
    url: '/item/wms-item/queryItemList',
    method: 'post',
    params,
    data
  })
}

/**
 * 录入或更新物料信息
 * @param data
 * @returns {AxiosPromise}
 */
export function saveOrUpdateItem(data) {
  return request({
    url: '/item/wms-item/saveOrUpdateItem',
    method: 'post',
    data
  })
}

/**
 * 删除物料信息
 * @param itemId
 * @returns {AxiosPromise}
 */
export function deleteItemById(itemId) {
  return request({
    url: '/item/wms-item/deleteItemById/' + itemId,
    method: 'get'
  })
}

/**
 * 删除物料信息
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteByIdList(data) {
  return request({
    url: '/item/wms-item/deleteByIdList',
    method: 'post',
    data
  })
}
