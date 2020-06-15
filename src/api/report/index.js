import request from "@/utils/request"

/**
 * 库存现有量查询
 * @param params
 * @param data
 */
export function queryQuantityList(params, data) {
  return request({
    url: '/onhand/wms-item-onhand-quantity/queryQuantityList',
    method: 'post',
    params,
    data
  })
}

/**
 * 查询条码物料信息
 * @param params
 * @param data
 */
export function queryWmsSglItemList(params,data) {
  return request({
    url: '/sqlItem/wms-sgl-item/queryWmsSglItemList',
    method: 'post',
    params,
    data
  })
}
