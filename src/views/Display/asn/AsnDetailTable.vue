<template>
    <div style="position: relative;">
        <div class="detail-wrapper">
            <!--            <DatePeriodSelect :default-period-date="selectedDate" :clearable="false" class="filter-item" @getSelectedDate="getSelectedDate" />-->

            <!--      <KeyWordSearch input-width="360px" place-holder="支持账户名、显示名称、手机号、邮箱快速搜索" @search="getSearchData" />-->

        </div>
        <div>
            <el-table
                    ref="table"
                    v-loading="loading"
                    border
                    :max-height="tableHeight"
                    :data="tableData"
                    stripe
                    style="width: 100%"
            >
                <el-table-column
                        type="selection"
                        width="30">
                </el-table-column>
                <el-table-column prop="dsequenceNum" label="钢板号">
                </el-table-column>
                <el-table-column align="center" prop="receiveFlag" label="接收标识">
                    <template slot-scope="scope">
                        <span>{{scope.row.receiveFlag ? 'Y' : 'N'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="qcStatus" align="center" label="质检状态">
                </el-table-column>
                <el-table-column prop="itemCode" label="物料编码">
                </el-table-column>
                <el-table-column prop="description" label="物料描述">
                </el-table-column>
                <el-table-column prop="itemTexture" label="材质">
                </el-table-column>
                <el-table-column prop="shipNumber" label="船号">
                </el-table-column>
                <el-table-column prop="sectionNum" label="分段号">
                </el-table-column>
                <el-table-column prop="ccs" label="船级">
                </el-table-column>
                <el-table-column prop="weight" label="重量">
                </el-table-column>
                <el-table-column prop="size" label="规格">
                </el-table-column>
                <el-table-column prop="length" label="长度">
                </el-table-column>
                <el-table-column prop="width" label="宽度">
                </el-table-column>
                <el-table-column prop="thickness" label="厚度">
                </el-table-column>
                <el-table-column prop="sizeUom" align="center" label="尺寸单位">
                </el-table-column>
                <el-table-column align="" prop="heatNumber" label="炉号">
                </el-table-column>
                <el-table-column prop="note" label="备注">
                </el-table-column>
                                <el-table-column
                                        width="90"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button  type="danger" size="mini" icon="el-icon-delete">
                                        </el-button>
                                    </template>
                                </el-table-column>
            </el-table>
            <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="initData"
            />
        </div>
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import {queryWmsErpAsnDetailList} from '../../../api/asn'

  export default {
    name: 'AsnDetailTable',
    components: {
      Pagination
    },
    created() {
      this.initData()
    },
    mounted() {
      const that = this
      this.initTaleHeight()
      window.addEventListener('resize', function() {
        that.initTaleHeight()
      })
    },
    methods: {
      initData() {
        const that = this
        this.loading = true
        setTimeout(() => {
          queryWmsErpAsnDetailList({
            current:this.listQuery.page,
            size: this.listQuery.limit
          },{headId: this.asnHeadFlag}).then(res => {
            if (res.code == 200) {
              that.tableData = res.data.records
              this.total = res.data.total
              that.loading  = false
            } else {
              Message.error(res.msg)
            }
          })
        },500)
      },
      initTaleHeight() {
        const topViewHeight = document.getElementById('bottomView').offsetHeight
        if (topViewHeight) {
          this.$nextTick(() => {
            // 50 表格上方按钮区域高度  120 分页组件区域高度  50 tabs组件高度
            this.tableHeight = topViewHeight - this.$refs.table.$el.offsetTop - 120 - 50
          })
        }
      },
    },
    computed: {
      ...mapGetters([
        'asnHeadFlag'
      ])
    },
    data() {
      return {
        loading: false,
        tableData: [],
        tableHeight: 100,
        listQuery: {
          page: 1,
          limit: 20,
          offset: 0,
          selectOperationType: '',
          selectApplication: '',
          startTime: '',
          endTime: ''
        },
        total: 4
      }
    },
    watch: {
      asnHeadFlag: {
        handler(newVal ,oldValue) {
          this.initData()
        }
      }
    }
  }
</script>

<style scoped>

</style>
