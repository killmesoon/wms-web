<template>
    <div class="main-content">
        <div id="topView" ref="topView" class="top-view">
            <asn-head-table @notify="notifyLineData"></asn-head-table>
        </div>
        <div ref="lineDiv" class="line-view" />

        <div id="bottomView" ref="bottomView" class="bottom-view">
            <el-tabs v-model="activeName">
                <el-tab-pane name="first">
                    <span slot="label"><i class="el-icon-user" /> 行信息</span>
                    <asn-line-table ref="asnLineTable"></asn-line-table>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="el-icon-school" /> 明细信息</span>
                    <asn-detail-table></asn-detail-table>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>

  import AsnHeadTable from './AsnHeadTable'
  import AsnLineTable from './AsnLineTable'
  import AsnDetailTable from './AsnDetailTable'
  export default {
    name: 'index',
    components: { AsnDetailTable, AsnLineTable, AsnHeadTable },
    data() {
      return {
        activeName: 'first',
        topViewHeightPercent: 0.5,
        bottomViewHeightPercent: 0.5
      }
    },
    methods: {
      notifyLineData() {
        this.$refs.asnLineTable.initData()
      }
    }
  }
</script>

<style scoped>
    .main-content {
        background: white;
        height: calc(100vh - 84px);
    }
    .top-view {
        height: 50%;
        padding: 10px;
    }

    .bottom-view {
        height: 50%;
        padding: 10px;
    }

    .line-view {
        background-color:#DCDCDC;
        height:5px;
        cursor: s-resize
    }
</style>
