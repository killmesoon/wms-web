<template>
  <div class="handle-button" @click="toggleDrawer">
    <i :class="buttonShowState?'el-icon-close':'el-icon-setting'" />
  </div>
</template>
<script>
export default {
  props: {
    showState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttonShowState: false
    }
  },
  watch: {
    showState: function() {
      this.buttonShowState = this.showState
    }
  },
  mounted() {
    this.buttonShowState = this.showState
  },
  methods: {
    toggleDrawer() {
      this.buttonShowState = !this.buttonShowState
      this.$emit('showState', this.buttonShowState)
    }
  }
}
</script>
<style scoped>
  .handle-button {
  position: fixed;
  z-index: 99999999;
  top: 200px;
  right: 0;
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  background-color: #027AFF;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
