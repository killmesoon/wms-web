<template>
  <div class="marquee_box">
    <ul class="marquee_list" :class="{marquee_top:animate}">
      <li v-for="(item, index) in marqueeList" :key="index">
        <span>{{ item.content }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      timer: null,
      animate: false,
      marqueeList: []
    }
  },
  mounted: function() {
    this.marqueeList = this.list
    this.timer = setInterval(this.showMarquee, 3000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    showMarquee: function() {
      this.animate = true
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0])
        this.marqueeList.shift()
        this.animate = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
  /* 上下滚动样式 */
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .marquee_box {
	display: block;
	position: relative;
	width: 60%;
	height: 30px;
	overflow: hidden;
}

.marquee_list {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
}
.marquee_top {
	transition: all 0.5s;
	margin-top: -30px
}

.marquee_list li {
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	padding-left: 20px;
  text-align: left;
}

.marquee_list li span {
	padding: 0 2px;
}
</style>
