import request from '@/utils/request'

/**
 * 查询头信息
 * @param params
 * @param data
 */
export function findInboundList(params, data) {
  return request({
    url: '/inboundHead/wms-inbound-order-head/findInboundOrderHeadList',
    method: 'post',
    params,
    data
  })
}

/**
 * 根据headId查询行信息
 * @param params
 * @param headId
 */
export function findInboundLineListByHeadId(params,headId) {
  return request({
    url: '/inboundLine/wms-inbound-order-line/findInboundOrderLineListByHeadId/' + headId,
    method: 'get',
    params
  })
}

/**
 * 根据ID查询明细列表
 * @param params
 * @param headId
 */
export function findInboundDetailListByHeadId(params, headId) {
  return request({
    url: '/inboundDetail/wms-inbound-order-detail/findInboundOrderDetailListByHeadId/' + headId,
    method: 'get',
    params
  })
}

/**
 * 根据headId删除头信息
 * @param headId
 */
export function deleteHeadById(headId) {
  return request({
    url: '/inboundHead/wms-inbound-order-head/deleteInboundHead/' + headId,
    method: 'get'
  })
}

/**
 * 删除行信息
 * @param lineId
 */
export function deleteLineById(lineId) {
  return request({
    url: '/inboundLine/wms-inbound-order-line/deleteLineById/' + lineId,
    method: 'get'
  })
}

/**
 * 新增或编辑
 * @param data
 */
export function saveOrUpdateInboundHead(data) {
  return request({
    url: '/inboundHead/wms-inbound-order-head/saveOrUpdateInboundHead',
    method: 'post',
    data
  })
}

/**
 * 根据入库单headId 删除关联的行信息
 * @param headId
 * @returns {AxiosPromise}
 */
export function deleteOrderLinesByHeadId(headId) {
  return request({
    url: '/inboundLine/wms-inbound-order-line/deleteOrderLinesByHeadId/' + headId,
    method: 'get'
  })
}


/**
 * 批量插入行信息
 * @param data
 * @returns {AxiosPromise}
 */
export function insertOrderLineList(data) {
  return request({
    url: '/inboundLine/wms-inbound-order-line/insertInboundOrderLineList',
    method: 'post',
    data
  })
}

/**
 * 根据Headid获取行表list
 * @param headId
 * @param current
 * @param size
 * @returns {AxiosPromise}
 */
export function getLineListByHeadId(params,headId) {
  return request({
    url: '/inboundLine/wms-inbound-order-line/findInboundOrderLineListByHeadId/' + headId,
    method: 'get',
    params
  })
}

/**
 * 单条插入行信息
 * @param data
 */
export function saveOrUpdateOrderLine(data) {
  return request({
    url: '/inboundLine/wms-inbound-order-line/saveOrUpdateOrderLine',
    method: 'post',
    data
  })
}

/**
 * 批量删除头信息
 * @param data
 */
export function deleteInboundHeadList(data) {
  return request({
    url: '/inboundHead/wms-inbound-order-head/deleteInboundHeadList',
    method: 'post',
    data
  })
}
