import request from '@/utils/request.js'

/**
 * 获取单位list
 * @param data
 * @param params
 * @returns {AxiosPromise}
 */
export function getUomList(params,data) {
  return request({
    url: '/uom/wms-uom/findUomList',
    method: 'post',
    params,
    data
  })
}

/**
 * 插入和修改uom
 * @param data
 * @returns {AxiosPromise}
 */
export function saveOrUpdateUom(data) {
  return request({
    url: '/uom/wms-uom//saveOrUpdateUom',
    method: 'post',
    data
  })
}

/**
 * 单条删除
 * @param uomId
 * @returns {AxiosPromise}
 */
export function deleteUomById(uomId) {
  return request({
    url: '/uom/wms-uom/deleteUomById/' + uomId,
    method: 'get'
  })
}

/**
 * 批量删除
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteUomByIdList(data) {
  return request({
    url: '/uom/wms-uom//deleteUomByIdList',
    method: 'post',
    data
  })
}
