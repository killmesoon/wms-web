<template>
  <el-switch
    v-model="switchValue"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="1"
    inactive-value="0"
    @change="handleChange"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      require: true
    }
  },
  data() {
    return {
      switchValue: '1'
    }
  },
  mounted() {
    this.switchValue = this.value.toString()
  },
  methods: {
    handleChange() {
      this.$emit('input.focus', Number(this.switchValue))
    }
  }
}
</script>
