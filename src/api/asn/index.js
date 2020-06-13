import request from "@/utils/request"

/**
 * 查询送货单头信息
 * @param params
 * @param data
 */
export function queryWmsErpAsnHeadList(params, data) {
  return request({
    url: '/asnHead/wms-erp-asn-head/queryWmsErpAsnHeadList',
    method: 'post',
    params,
    data
  })
}

/**
 * 新增或编辑入库单头信息
 * @param data
 */
export function saveOrUpdateWmsErpAsnHead(data) {
  return request({
    url: '/asnHead/wms-erp-asn-head/saveOrUpdateWmsErpAsnHead',
    method: 'post',
    data
  })
}

export function saveWmsErpAsnOrder(data) {
  return request({
    url: '/asnHead/wms-erp-asn-head/saveWmsErpAsnOrder',
    method: 'post',
    data
  })
}

/**
 * 批量删除头信息
 * @param data
 */
export function deleteWmsErpAsnHeadList(data) {
  return request({
    url: '/asnHead/wms-erp-asn-head/deleteWmsErpAsnHeadList',
    method: 'post',
    data
  })
}

/**
 * 逐条删除送货单头信息
 * @param id
 */
export function deleteWmsErpAsnHeadById(id) {
  return request({
    url: '/asnHead/wms-erp-asn-head/deleteWmsErpAsnHeadById/' + id,
    method: 'get'
  })
}


//---------------

/**
 * 根据headId查询行信息
 * @param params
 * @param headId
 */
export function queryWmsErpAsnLineListByHeadId(params,headId) {
  return request({
    url: '/asnLine/wms-erp-asn-line/queryWmsErpAsnLineListByHeadId/' + headId,
    method: 'get',
    params
  })
}

/**
 * 批量更新或插入
 * @param data
 */
export function saveOrUpdateWmsErpAsnLine(data) {
  return request({
    url: '/asnLine/wms-erp-asn-line/saveOrUpdateWmsErpAsnLine',
    method: 'post',
    data
  })
}

/**
 * 批量更新行信息
 * @param data
 */
export function saveOrUpdateWmsErpAsnLineList(data) {
  return request({
    url: '/asnLine/wms-erp-asn-line/saveOrUpdateWmsErpAsnLineList',
    method: 'post',
    data
  })
}



/**
 * 根据headId删除行信息
 * @param headId
 */
export function deleteWmsErpAsnLineByHeadId(headId) {
  return request({
    url: '/asnLine/wms-erp-asn-line/deleteWmsErpAsnLineByHeadId/' + headId,
    method: 'get'
  })
}


//----------------

/**
 * 查询明细信息list
 * @param params
 * @param data
 */
export function queryWmsErpAsnDetailList(params, data) {
  return request({
    url: '/asnDetail/wms-erp-asn-detail/queryWmsErpAsnDetailList',
    method: 'post',
    params,
    data
  })
}

/**
 * 批量插入明细信息
 * @param data
 */
export function saveOrUpdateDetailList(data) {
  return request({
    url: '/asnDetail/wms-erp-asn-detail/saveOrUpdateDetailList',
    method: 'post',
    data
  })
}
