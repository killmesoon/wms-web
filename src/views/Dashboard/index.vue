<template>
    <div class="white-body-view dashboard-style">
        <div class="top-view">
            <div class="view-item">
                <div class="job-item-view">
                    <div class="view-item">
                        <div class="item-circle">
                        </div>
                      <div class="item-text">
                        <h1 style="color: #026ee6;">15</h1>
                        <div><span>今日任务数</span></div>
                      </div>
                    </div>
                    <div class="view-item">
                      <div class="item-circle"></div>
                      <div class="item-text">
                        <h1 style="color: coral;">10</h1>
                        <div><span>待处理任务数</span></div>
                      </div>
                    </div>
                    <div class="view-item">
                      <div class="item-circle"></div>
                      <div class="item-text">
                        <h1 style="color: #5daf34">5</h1>
                        <div><span>已完成任务数</span></div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="view-item">
              <div class="job-item-view">
                <div class="view-item">
                  <div class="item-menu" @click="changeRoute('inbound')">
                    <div class="menu-route inbound"></div>
                      <div class="menu-text">入库单管理</div>
                  </div>
                </div>
                <div class="view-item">
                  <div class="item-menu" @click="changeRoute('outbound')">
                    <div class="menu-route outbound"></div>
                      <div class="menu-text">出库单管理</div>
                  </div>
                </div>
                <div class="view-item">
                  <div class="item-menu">
                    <div class="menu-route search" @click="changeRoute('report')"></div>
                      <div class="menu-text">现有量查询</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="bottom-view">
            <div class="view-item">
                <div class="job-item-view">

                </div>
            </div>
            <div class="view-item">
                <div class="job-item-view">
                </div>
            </div>
            <div class="view-item">
                <div class="job-item-view">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
  export default {
    name: 'Dashboard',
    data() {
      return {}
    },
    methods: {
      resize() {
        console.log('resize')
      },
      changeRoute(url) {
        console.log(this.$route)
        this.$router.push({path: '/' + url})
      }
    }
  }
</script>

<style scoped>
    .dashboard-style {
        background-color: #faf9f9;
    }

    .top-view {
        height: 40%;
        padding: 10px;
        display: flex;
    }

    .bottom-view {
        height: 60%;
        display: flex;
    }

    .view-item {
        flex: 1;
        position: relative;
    }

    .job-item-view {
        width: 98%;
        height: 100%;
        padding: 5px 5px;
        background-color: #fff;
        display: flex;
    }

    .item-circle {
        width: 200px;
        height: 200px;
        background-color: #eeeeee;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        position: absolute;
        left: calc(50% - 100px);
        top: calc(50% - 100px);
    }
  .item-text {
    width: 150px;
    height: 150px;
    position: absolute;
    left: calc(50% - 75px);
    top: calc(50% - 75px);
    text-align: center;
  }
  .item-text h1 {
    font-size: 2.5em;
  }
  .item-text > div {
    height: 30px;
    line-height: 30px;
    font-size: 1em;
    font-weight: 700;
  }

  .item-menu {
      width: 150px;
      height: 150px;
      position: absolute;
      left: calc(50% - 75px);
      top: calc(50% - 75px);
      text-align: center;
      cursor: pointer;
  }

  .menu-route {
      position: absolute;
      height: 40px;
      width: 40px;
      left: calc(50% - 20px);
      top: calc(50% - 40px);
  }
    .menu-text {
        position: absolute;
        width: 100px;
        height: 30px;
        line-height: 30px;
        left: calc(50% - 50px);
        top: 55%;
    }
    .inbound {
        background: url("../../assets/images/dashboard/inbound.png") no-repeat;
    }
    .outbound {
        background: url("../../assets/images/dashboard/outbound.png") no-repeat;
    }
    .search {
        background: url("../../assets/images/dashboard/search.png") no-repeat;
    }
</style>
