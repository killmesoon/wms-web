import request from "@/utils/request"
/**
 * 查询仓库list
 * @param params
 * @param data
 * @returns {AxiosPromise}
 */
export function getWareHouseList(params, data) {
  return request({
    url: '/warehouse/wms-warehouse/findWareHouseList',
    method: 'post',
    data,
    params
  })
}

/**
 * 新增或更新
 * @param data
 */
export function saveOrUpdateWarehouse(data) {
  return request({
    url: '/warehouse/wms-warehouse/saveOrUpdateWarehouse',
    method: 'post',
    data
  })
}

/**
 * 批量删除
 * @param data
 */
export function deleteWarehouseList(data) {
  return request({
    url: '/warehouse/wms-warehouse/deleteWarehouseList',
    method: 'post',
    data
  })
}

export function deleteWarehouseById(id) {
  return request({
    url: '/warehouse/wms-warehouse/deleteWarehouseById/' + id,
    method: 'get'
  })
}
