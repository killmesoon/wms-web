<template>
  <div>
    <el-input v-model.number="inputValue" :max="max" :min="min" type="number" :on-keypress="verification()" @change="handleClick">
      <template v-if="myProps !== null" slot="append">{{ myProps }}</template>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    myProps: {
      type: String,
      default: null
    },
    max: {
      type: Number,
      default: Math.max
    },
    min: {
      type: Number,
      default: Math.min
    },
    // 模式: positiveInteger:只可输入正整数
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    value(val) {
      if (typeof val !== 'number') {
        return
      }

      if (this.myProps != null && this.myProps.indexOf('%') !== -1) {
        this.inputValue = this.value * 100
      } else {
        this.inputValue = this.value
      }
    }
  },
  mounted() {
    if (this.myProps != null && this.myProps.indexOf('%') !== -1) {
      this.inputValue = this.value * 100
    } else {
      this.inputValue = this.value
    }
  },
  methods: {
    verification() {
      return false
      // 
      // if (this.type === 'positiveInteger') {
      //   
      //   return (/[\d]/.test(String.fromCharCode(e.keyCode)))

      //   // // 正整数
      //   // if (e.key === '.') {
      //   //   e.target.value = e.target.value.replace('2', '3')
      //   //   // e.target.value = ''
      //   //   // return false
      //   // }
      //   // this.inputValue = this.inputValue.replace('2', '1')
      // }
      // this.$emit('verification', this.inputValue)
    },
    handleClick() {
      if (this.myProps != null && this.myProps.indexOf('%') !== -1) {
        this.$emit('input', this.inputValue / 100)
      } else {
        this.$emit('input', this.inputValue)
      }
    }
  }
}
</script>
