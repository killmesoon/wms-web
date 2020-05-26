<template>
  <span>
    <el-input v-model="filterTitle" :placeholder="placeHolder" :style="{'width': inputWidth}" class="filter-item" @keyup.enter.native="search(filterTitle)" />
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search(filterTitle)" />
  </span>
</template>

<script>
import waves from '@/directive/waves' // waves directive
export default {
  directives: {
    waves
  },
  props: {
    placeHolder: {
      default: '快速搜索',
      type: String
    },
    inputWidth: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      filterTitle: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.filterTitle)
    }
  }
}
</script>

<style>

</style>

