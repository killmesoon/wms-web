import { initDicList } from '../../api/dic/dic'
import ca from 'element-ui/src/locale/lang/ca'

const state = {
  dicInboundOrderTypeList: [],
  dicDocStatusList: [],
  dicSourceOrderTypeList: [],
  dicSupplierTypeList: [],
  dicSupplierStatusList: [],
  dicYNList: [],
  dicWarehouseTypeList: [],
  dicAreaTypeList: [],
  dicLocatorTypeList: [],
  dicUomTypeList: [],
  dicBarcodeTypeList: [],
  dicBarcodeStatusList: [],
  dicItemTypeList: [],
  dicAsnOrderTypeList: [],
  dicCalculateTypeList: []
}

const mutations = {
  SET_INBOUND_ORDER_TYPE_LIST: (state, list) => {
    state.dicInboundOrderTypeList = list
  },
  SET_DOC_STATUS_LIST: (state, list) => {
    state.dicDocStatusList = list
  },
  SET_SOURCE_DOC_TYPE_LIST: (state, list) => {
    state.dicSourceOrderTypeList = list
  },
  SET_SUPPLIER_TYPE_LIST: (state, list) => {
    state.dicSupplierTypeList = list
  },
  SET_SUPPLIER_STATUS_LIST: (state, list) => {
    state.dicSupplierStatusList = list
  },
  SET_YN_LIST: (state, list) => {
    state.dicYNList = list
  },
  SET_WAREHOUSE_TYPE_LIST: (state, list) => {
    state.dicWarehouseTypeList = list
  },
  SET_AREA_TYPE_LIST: (state, list) => {
    state.dicAreaTypeList = list
  },
  SET_LOCATOR_TYPE_LIST: (state, list) => {
    state.dicLocatorTypeList = list
  },
  SET_UOM_TYPE_LIST: (state, list) => {
    state.dicUomTypeList = list
  },
  SET_BARCODE_TYPE_LIST: (state, list) => {
    state.dicBarcodeTypeList = list
  },
  SET_BARCODE_STATUS_LIST: (state, list) => {
    state.dicBarcodeStatusList = list
  },
  SET_ITEM_TYPE_LIST: (state, list) => {
    state.dicItemTypeList = list
  },
  SET_ASN_ORDER_TYPE_LIST: (state, list) => {
    state.dicAsnOrderTypeList = list
  },
  SET_CALCULATE_TYPE_LIST: (state, list) => {
    state.dicCalculateTypeList = list
  }

}

const actions = {
  initDic({ commit }) {
    return new Promise((resolve, reject) => {
      initDicList().then(response => {
        const { data } = response
        let dicInboundOrderTypeListTmp = [] //入库单类型List
        let dicDocStatusList = [] //单据状态list
        let dicSourceOrderTypeList = [] //来源单据类型
        let dicSupplierTypeList = [] //供应商类型List
        let dicSupplierStatusList = [] //供应商状态list
        let dicYNList = [] //YN 快码
        let dicWarehouseTypeList = [] //仓库类型快码
        let dicAreaTypeList = [] //区域类型
        let dicLocatorTypeList = [] //货位类型
        let dicUomTypeList = [] //单位类型
        let dicBarcodeTypeList = [] //条码类型
        let dicBarcodeStatusList = [] //条码状态
        let dicItemTypeList = [] //物料类型
        let dicAsnOrderTypeList = [] //送货单类型
        let dicCalculateTypeList = [] //事件计算类型
        for (let dic of data) {
          switch (dic.dicTypeId) {
            case 1:
              dicYNList.push(dic)
              break
            case 2:
              dicWarehouseTypeList.push(dic)
              break
            case 3:
              dicAreaTypeList.push(dic)
              break
            case 4:
              dicLocatorTypeList.push(dic)
              break
            case 5:
              dicUomTypeList.push(dic)
              break
            case 6:
              dicSupplierTypeList.push(dic)
              break
            case 7:
              dicSupplierStatusList.push(dic)
              break
            case 8:
              dicCalculateTypeList.push(dic)
              break
            case 9:
              dicBarcodeTypeList.push(dic)
              break
            case 10:
              dicBarcodeStatusList.push(dic)
              break
            case 11:
              dicItemTypeList.push(dic)
              break
            case 16:
              dicDocStatusList.push(dic)
              break
            case 19:
              dicSourceOrderTypeList.push(dic)
              break
            case 20:
              dicInboundOrderTypeListTmp.push(dic)
              break
            case 24:
              dicAsnOrderTypeList.push(dic)
              break
          }
        }
        commit('SET_INBOUND_ORDER_TYPE_LIST', dicInboundOrderTypeListTmp)
        commit('SET_DOC_STATUS_LIST', dicDocStatusList)
        commit('SET_SOURCE_DOC_TYPE_LIST', dicSourceOrderTypeList)
        commit('SET_SUPPLIER_TYPE_LIST', dicSupplierTypeList)
        commit('SET_SUPPLIER_STATUS_LIST', dicSupplierStatusList)
        commit('SET_YN_LIST', dicYNList)
        commit('SET_WAREHOUSE_TYPE_LIST', dicWarehouseTypeList)
        commit('SET_AREA_TYPE_LIST', dicAreaTypeList)
        commit('SET_LOCATOR_TYPE_LIST', dicLocatorTypeList),
        commit('SET_UOM_TYPE_LIST', dicUomTypeList),
        commit('SET_BARCODE_TYPE_LIST', dicBarcodeTypeList),
        commit('SET_BARCODE_STATUS_LIST', dicBarcodeStatusList)
        commit('SET_ITEM_TYPE_LIST', dicItemTypeList)
        commit('SET_ASN_ORDER_TYPE_LIST', dicAsnOrderTypeList)
        commit('SET_CALCULATE_TYPE_LIST', dicCalculateTypeList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
