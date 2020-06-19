import request from '@/utils/request'

/**
 * 供应商列表list
 * @param params
 * @param data
 * @returns {AxiosPromise}
 */
export function findSupplierList(params,data) {
  return request({
    url: '/supplier/wms-supplier/findSupplierList',
    method: 'post',
    params,
    data
  })
}

/**
 * 插入或者更新供应商
 * @param data
 * @returns {AxiosPromise}
 */
export function saveOrUpdateSupplier(data) {
  return request({
    url: '/supplier/wms-supplier/saveOrUpdateSupplier',
    method: 'post',
    data
  })
}

/**
 * 单条删除
 * @param supplierId
 * @returns {AxiosPromise}
 */
export function deleteSupplierById(supplierId) {
  return request({
    url: '/supplier/wms-supplier/deleteSupplierById/' + supplierId,
    method: 'get'
  })
}

/**
 * 批量删除供应商
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteSupplierList(data) {
  return request({
    url: '/supplier/wms-supplier/deleteSupplierList',
    method: 'post',
    data
  })
}

/**
 *
 * @param data
 */
export function checkSupplierExits(data) {
  return request({
    url: '/supplier/wms-supplier/checkSupplierExits',
    method: 'post',
    data
  })
}
