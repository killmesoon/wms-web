<template>
  <span>
    <el-input v-model="filterTitle" placeholder="快速搜索" style="width: 350px;" class="filter-item" @keyup.enter.native="search(filterTitle)" />
    <el-button v-waves class="filter-item" type="info" icon="el-icon-search" @click="search(filterTitle)">
      <!-- 搜索 -->
    </el-button>
  </span>
</template>

<script>
import waves from '@/directive/waves' // waves directive
export default {
  directives: {
    waves
  },
  data() {
    return {
      filterTitle: ''
    }
  },
  methods: {
    search: function() {
      this.$emit('search', this.filterTitle)
    }
  }
}
</script>

<style>

</style>

