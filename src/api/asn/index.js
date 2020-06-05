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
