<template>
  <div>
    <span :style="{'color':color}">{{ showText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
      require: true
    },
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      color: ''
    }
  },
  computed: {
    showText: function() {
      return this.value
    }
  },
  mounted() {
    this.color = this.myProps
  }
}
</script>
