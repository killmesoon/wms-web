<template>
    <div ref="mainContent" class="main-content">
        <div id="topView" ref="topView" class="top-view">
            <outbound-head-table ref="outboundHeadTable"></outbound-head-table>
        </div>
        <div ref="lineDiv" class="line-view"/>

        <div id="bottomView" ref="bottomView" class="bottom-view">
            <el-tabs v-model="activeName">
                <el-tab-pane name="first">
                    <span slot="label"><i class="el-icon-user"/> 行信息</span>
                    <outbound-line-table ref="outboundLineTable"></outbound-line-table>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="el-icon-user"/> 明细信息</span>
                    <outbound-detail-table></outbound-detail-table>
                </el-tab-pane>
            </el-tabs>
        </div>


    </div>
</template>

<script>
  import OutboundHeadTable from './OutboundHeadTable'
  import OutboundLineTable from './OutboundLineTable'
  import OutboundDetailTable from './OutboundDetailTable'

  export default {
    name: 'Outbound',
    components: {
      OutboundLineTable,
      OutboundHeadTable,
      OutboundDetailTable
    },
    data() {
      return {
        activeName: 'first',
        topViewHeightPercent: 0.5,
        bottomViewHeightPercent: 0.5
      }
    },
    mounted() {
      var tableDiv = this.$refs.topView
      var bottomView = this.$refs.bottomView
      var oDiv = this.$refs.lineDiv
      const that = this
      oDiv.onmousedown = function(ev) {
        var theight = parseInt(tableDiv.offsetHeight) // parseInt为了不指向对象
        var dheight = parseInt(bottomView.offsetHeight)
        // oDiv.style.cursor = 's-resize'
        var mousedown = ev || event
        // 鼠标按下坐标
        var mouseDownY = mousedown.clientY
        // IE8 取消默认行为-设置全局捕获
        if (oDiv.setCapture) {
          oDiv.setCapture()
        }
        document.onmousemove = function(ev) {
          var mousemove = ev || event
          // 鼠标移动时的鼠标位置
          var mouseMoveY = mousemove.clientY
          var topViewHeight = theight + (mouseMoveY - mouseDownY)
          var bottomViewHeight = dheight + (mouseDownY - mouseMoveY)
          if (topViewHeight < 200) {
            topViewHeight = 200
            bottomViewHeight = that.$refs.mainContent.offsetHeight - 200
          }
          if (bottomViewHeight < 200) {
            bottomViewHeight = 200
            topViewHeight = that.$refs.mainContent.offsetHeight - 200
          }
          // 计算上下2部分高度百分比
          that.topViewHeightPercent = (topViewHeight / that.$refs.mainContent.offsetHeight).toFixed(2)
          that.bottomViewHeightPercent = (bottomViewHeight / that.$refs.mainContent.offsetHeight).toFixed(2)
          // 设置上下部分高度
          tableDiv.style.height = topViewHeight + 'px'
          bottomView.style.height = bottomViewHeight + 'px'
          that.$refs.outboundHeadTable.initTaleHeight()
          that.$refs.outboundLineTable.initTaleHeight()
        }
      }

      document.onmouseup = function() {
        document.onmousemove = null
        // 释放全局捕获
        if (oDiv.releaseCapture) {
          oDiv.releaseCapture()
        }
      }
      // 窗口拉升时，动态改变页面高度
      this.initViewHeight()
      window.addEventListener('resize', function() {
        that.initViewHeight()
      })
    },

    created() {

    },

    methods: {

      // 初始化页面高度
      initViewHeight() {
        this.$nextTick(() => {
          const mainView = this.$refs.mainContent
          if (mainView) {
            const mainHeight = this.$refs.mainContent.offsetHeight
            const topViewHeight = (mainHeight * this.topViewHeightPercent).toFixed(2)
            const bottomViewHeight = (mainHeight * this.bottomViewHeightPercent).toFixed(2)
            // 根据百分比，设置页面高度
            this.$refs.topView.style.height = topViewHeight + 'px'
            this.$refs.bottomView.style.height = bottomViewHeight + 'px'
            this.$refs.outboundHeadTable.initTaleHeight()
            this.$refs.outboundLineTable.initTaleHeight()
          }
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
    .main-content {
        background: white;
        height: calc(100vh - 84px);
    }

    .top-view {
        height: 50%;
        padding: 20px;
        // overflow: auto;
    }

    .bottom-view {
        height: 50%;
        padding: 20px;
        // overflow: auto;
    }

    .line-view {
        background-color:#DCDCDC;
        height:5px;
        cursor: s-resize
    }
</style>
