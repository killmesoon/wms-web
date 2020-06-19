import request from "@/utils/request"

/**
 * 查询
 * @param params
 * @param data
 */
export function queryWarehouseAreaList(params, data) {
  return request({
    url: '/area/wms-warehouse-area/queryWarehouseAreaList',
    method: 'post',
    params,
    data
  })
}

/**
 * 更新or新增
 * @param data
 */
export function saveOrUpdateWarehouseAreaList(data) {
  return request({
    url: '/area/wms-warehouse-area/saveOrUpdateWarehouseAreaList',
    method: 'post',
    data
  })
}

/**
 * 批量删除
 * @param data
 */
export function deleteWarehouseAreaList(data) {
  return request({
    url: '/area/wms-warehouse-area/deleteWarehouseAreaList',
    method: 'post',
    data
  })
}

/**
 * 逐条删除
 * @param id
 */
export function deleteWarehouseAreaById(id) {
  return request({
    url: '/area/wms-warehouse-area/deleteWarehouseAreaById/' + id,
    method: 'get'
  })
}

/**
 * 验证是否可以删除
 * @param id
 */
export function isWarehouseAreaDelete(id) {
  return request({
    url: '/area/wms-warehouse-area/isWarehouseAreaDelete/' + id,
    method: 'get'
  })
}

/**
 * 批量删除时的标识
 * @param data
 */
export function isWarehouseAreaListDelete(data) {
  return request({
    url: '/area/wms-warehouse-area/isWarehouseAreaListDelete',
    method: 'post',
    data
  })
}

/**
 * 验证区域编码是否存在
 * @param data
 */
export function checkAreaCodeExits(data) {
  return request({
    url: '/area/wms-warehouse-area/checkAreaCodeExits',
    method: 'post',
    data
  })
}

