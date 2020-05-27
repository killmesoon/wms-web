import request from "@/utils/request"

/**
 * 查询条码
 * @param params
 * @param data
 */
export function queryBarcodeList(params,data) {
  return request({
    url: '/barcode/wms-barcode/queryBarcodeList',
    method: 'post',
    params,
    data
  })
}

/**
 * 增加或更新条码
 * @param data
 */
export function saveOrUpdateBarcode(data) {
  return request({
    url: '/barcode/wms-barcode/saveOrUpdateBarcode',
    method: 'post',
    data
  })
}

/**
 * 批量删除条码
 * @param data
 */
export function deleteBarCodeByIdList(data) {
  return request({
    url: '/barcode/wms-barcode/deleteBarCodeByIdList',
    method: 'post',
    data
  })
}

/**
 * 逐条删除条码
 * @param id
 */
export function deleteBarcodeById(id) {
  return request({
    url: '/barcode/wms-barcode/deleteBarcodeById/' + id,
    method: 'get'
  })
}
