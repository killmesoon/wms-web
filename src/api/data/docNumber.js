import request from "@/utils/request"

/**
 * 查询单据设置
 * @param params
 * @param data
 */
export function queryDocAutoNumber(params, data) {
  return request({
    url: '/docAutonumber/wms-doc-autonumber/queryDocAutoNumber',
    method: 'post',
    params,
    data
  })
}

/**
 * 新增或更新
 * @param data
 */
export function saveOrUpdateDocAutoNumber(data) {
  return request({
    url: '/docAutonumber/wms-doc-autonumber/saveOrUpdateDocAutoNumber',
    method: 'post',
    data
  })
}

/**
 * 批量删除
 * @param data
 */
export function deleteDocAutoNumberList(data) {
  return request({
    url: '/docAutonumber/wms-doc-autonumber/deleteDocAutoNumberList',
    method: 'post',
    data
  })
}

/**
 * 逐条删除
 * @param id
 */
export function deleteDocAutoNumberById(id) {
  return request({
    url: '/docAutonumber/wms-doc-autonumber/deleteDocAutoNumberById/' + id,
    method: 'get'
  })
}
