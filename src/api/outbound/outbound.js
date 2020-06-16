import request from '@/utils/request'
/**
 * 获取出库单信息列表
 * @param page
 * @param data
 * @returns {AxiosPromise}
 */
export function getOutBoundOrderList(page, data) {
  return request({
    url: '/outboundHead/wms-outbound-order-head/findOutboundHeadList',
    method: 'post',
    params: page,
    data
  })
}

/**
 * 插入出库单头信息
 * @param data
 * @returns {AxiosPromise}
 */
export function saveOrUpdateOutboundHead(data) {
  return request({
    url: '/outboundHead/wms-outbound-order-head/saveOrUpdateOutboundHead',
    method: 'post',
    data
  })
}

/**
 * 根据headId删除关联行信息
 * @param headId
 * @returns {AxiosPromise}
 */
export function deleteOutboundOrderLinesByHeadId(headId) {
  return request({
    url: '/outboundLine/wms-outbound-order-line/deleteOrderLinesByHeadId/' + headId,
    method: 'get'
  })
}

/**
 * 根据ID单挑删除
 * @param lineId
 */
export function deleteOutboundLineById(lineId) {
  return request({
    url: '/outboundLine/wms-outbound-order-line/deleteOutboundLineById/' + lineId,
    method: 'get'
  })
}

/**
 * 批量插入行信息
 * @param data
 */
export function saveOrUpdateOutboundOrderLineList(data) {
  return request({
    url: '/outboundLine/wms-outbound-order-line/saveOrUpdateOutboundOrderLineList',
    method: 'post',
    data
  })
}

/**
 * 根据headId查询行信息
 * @param headId
 * @returns {AxiosPromise}
 */
export function findOutboundOrderLineListByHeadId(page, headId) {
  return request({
    url: '/outboundLine/wms-outbound-order-line/findOutboundOrderLineListByHeadId/' + headId,
    method: 'get',
    param: page
  })
}

/**
 * 单条删除头信息及关联
 * @param headId
 * @returns {AxiosPromise}
 */
export function deleteOutboundHeadByHeadId(headId) {
  return request({
    url: '/outboundHead/wms-outbound-order-head/deleteOutboundHeadByHeadId/' + headId,
    method: 'get'
  })
}

/**
 * 单条插入出库单行信息
 * @param data
 */
export function saveOrUpdateOutboundOrderLine(data) {
  return request({
    url: '/outboundLine/wms-outbound-order-line/saveOrUpdateOutboundOrderLine',
    method: 'post',
    data
  })
}

/**
 * 查询详情
 * @param params
 * @param headId
 */
export function findOutboundOrderDetailListByHeadId(params ,headId) {
  return request({
    url: '/outboundDetail/wms-outbound-order-detail/findOutboundOrderDetailListByHeadId/' + headId,
    method: 'get',
    params
  })
}

/**
 * 查询出库单详情
 * @param params
 * @param data
 */
export function findOutboundOrderDetailList(params,data) {
  return request({
    url: '/outboundDetail/wms-outbound-order-detail/findOutboundOrderDetailList',
    method: 'post',
    params,
    data
  })
}

/**
 * 根据行ID删除明细
 * @param lineId
 * @param data
 */
export function saveOrUpdateDetailList(lineId ,data) {
  return request({
    url: '/outboundDetail/wms-outbound-order-detail/saveOrUpdateDetailList/' + lineId,
    method: 'post',
    data
  })
}

