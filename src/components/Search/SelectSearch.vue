<template>

  <el-select v-if="isGroup" v-model="selectedItem" :placeholder="placeholder" @change="selectChange">
    <el-option-group
      v-for="group in optionList"
      :key="group.label"
      v-model="selectedItem"
      :label="group.label"
      clearable
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </el-select>

  <el-select
    v-else
    v-model="selectedItem"
    :placeholder="placeholder"
    clearable
    class="filter-item"
    :style="{'width':selectWidth+'px'}"
    @change="selectChange"
  >
    <el-option
      v-for="item in optionList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

</template>

<script>
export default {
  props: {
    isGroup: {
      default: false,
      type: Boolean
    },
    placeholder: {
      default: '请选择',
      type: String
    },
    selectWidth: {
      default: 120,
      type: Number
    },
    optionList: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultValue: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      selectedItem: ''
    }
  },
  watch: {
    defaultValue: function() {
      this.selectedItem = this.defaultValue
    }
  },
  methods: {
    selectChange() {
      this.$emit('selectedItem', this.selectedItem)
    }
  }
}
</script>

<style>

</style>

