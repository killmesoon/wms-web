<template>
  <div>
    <span :style="{'color':color}">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      require: true
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      type: Array,
      default: null,
      required: true
    }
  },
  data() {
    return {
      color: '',
      text: ''
    }
  },
  watch: {
    value() {
      this.color = this.myProps[this.value].color
      this.text = this.myProps[this.value].text
    }
  },
  mounted() {
    this.color = this.myProps[this.value].color
    this.text = this.myProps[this.value].text
  }
}
</script>
