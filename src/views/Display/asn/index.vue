<template>
    <div class="main-content">
        <div id="topView" ref="topView" class="top-view">
            <asn-head-table></asn-head-table>
        </div>
        <div ref="lineDiv" class="line-view" />

        <div id="bottomView" ref="bottomView" class="bottom-view">
            <asn-line-table></asn-line-table>
        </div>
    </div>
</template>

<script>

  import AsnHeadTable from './AsnHeadTable'
  import AsnLineTable from './AsnLineTable'
  export default {
    name: 'index',
    components: { AsnLineTable, AsnHeadTable }
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
