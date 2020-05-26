<template>

  <el-cascader ref="cascader" v-model="resCode" :options="resList" :props="{ checkStrictly: isCheckStrictly }" :show-all-levels="false" filterable @change="passData">

    <template slot-scope="{ node, data }">

      <span>{{ data.label }}</span>

      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>

    </template>

  </el-cascader>

</template>

<script>

export default {

  props: {

    arrayList: {

      type: Array,

      default: () => []

    },

    defaultSlectArray: {

      type: Array,

      default: () => []

    },
    isCheckStrictly: {
      type: Boolean,
      default: true
    }

  },

  data() {
    return {

      resList: this.arrayList,

      resCode: this.defaultSlectArray // 三级联动地区代码 默认显示  // 注意6：

    }
  },

  watch: {

    arrayList: function() {
      this.resList = this.arrayList
    },

    defaultSlectArray: function() {
      this.resCode = this.defaultSlectArray
    }

  },

  methods: {
    passData(data) {
      var note = this.$refs.cascader.getCheckedNodes(false)
      this.$emit('getCasData', this.resCode, note[0])
    }

  }

}

</script>

<style>

</style>
