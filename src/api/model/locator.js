import request from "@/utils/request"

/**
 * 查询
 * @param params
 * @param data
 */
export function queryLocatorList(params,data) {
  return request({
    url: '/locator/wms-locator/queryLocatorList',
    method: 'post',
    data,
    params
  })
}

/**
 * 新增或更新
 * @param data
 */
export function saveOrUpdateLocator(data) {
  return request({
    url: '/locator/wms-locator/saveOrUpdateLocator',
    method: 'post',
    data
  })
}

/**
 * 批量删除
 * @param data
 */
export function deleteLocatorList(data) {
  return request({
    url: '/locator/wms-locator/deleteLocatorList',
    method: 'post',
    data
  })
}

/**
 * 逐条删除
 * @param id
 */
export function deleteLocatorById(id) {
  return request({
    url: '/locator/wms-locator/deleteLocatorById/' + id,
    method: 'get',
  })
}

/**
 * 验证货位是否存在重复
 * @param data
 */
export function checkLocatorCodeExits(data) {
  return request({
    url: '/locator/wms-locator/checkLocatorCodeExits',
    method: 'post',
    data
  })
}
