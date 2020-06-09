
const state = {
  headIdFlag: 0,
  outboundHeadIdFlag: 0,
  asnHeadFlag: 0
}

const mutations = {
  SET_INBOUND_HEAD_ID: (state , headIdFlag) => {
    state.headIdFlag = headIdFlag
  },
  SET_OUTBOUND_HEAD_ID: (state , outboundHeadIdFlag) => {
    state.outboundHeadIdFlag = outboundHeadIdFlag
  },
  SET_ASN_HEAD_ID: (state , asnHeadFlag) => {
    state.asnHeadFlag = asnHeadFlag
  }
}

const actions = {
  setHeadId({commit}, headId) {
    commit('SET_INBOUND_HEAD_ID', headId)
  },
  setOutboundHeadId({commit}, headId) {
    commit('SET_OUTBOUND_HEAD_ID', headId)
  },
  setAsnHeadId({commit}, headId) {
    commit('SET_ASN_HEAD_ID', headId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

