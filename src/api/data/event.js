import request from "@/utils/request"

/**
 * 查询事件类型列表
 * @param params
 * @param data
 */
export function queryWmsObjectEventTypeList(params, data) {
  return request({
    url: '/eventsType/wms-object-event-type/queryWmsObjectEventTypeList',
    method: 'post',
    params,
    data
  })
}

/**
 * 更新或保存事件类型
 * @param data
 */
export function saveOrUpdateWmsObjectEventType(data) {
  return request({
    url: '/eventsType/wms-object-event-type/saveOrUpdateWmsObjectEventType',
    method: 'post',
    data
  })
}

/**
 * 逐条删除
 * @param typeId
 */
export function deleteWmsObjectEventTypeById(typeId) {
  return request({
    url: '/eventsType/wms-object-event-type/deleteWmsObjectEventTypeById/' + typeId,
    method: 'get'
  })
}


/**
 * 批量删除
 * @param data
 */
export function deleteWmsObjectEventType(data) {
  return request({
    url: '/eventsType/wms-object-event-type/deleteWmsObjectEventType',
    method: 'post',
    data
  })
}
