<template>
    <div @click="back" v-if="backTop" class="backTop_wrap">
      <div class="backTop">
        <i class="el-icon-upload2"></i>
      </div>
    </div>
</template>
<script>
import { scrollTop } from '@/libs/util'
import { on, off } from '@/libs/tools'

export default {
  name: 'ABackTop',
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    },
    container: {
      type: null,
      default: window
    }
  },
  data () {
    return {
      backTop: false
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, false)
    // window.addEventListener('resize', this.handleScroll, false)
//    on(this.containerEle, 'scroll', this.handleScroll)
//    on(this.containerEle, 'resize', this.handleScroll)
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.handleScroll, false)
    // window.removeEventListener('resize', this.handleScroll, false)
//    off(this.containerEle, 'scroll', this.handleScroll)
//    off(this.containerEle, 'resize', this.handleScroll)
  },
  computed: {
    containerEle () {
      return this.container === window ? window : document.querySelector(this.container)
    }
  },
  methods: {
    handleScroll () {
      this.backTop = this.containerEle.scrollTop >= this.height
    },
    back () {
      let target = typeof this.container === 'string' ? this.containerEle : (document.documentElement || document.body)
      const sTop = target.scrollTop
      scrollTop(this.containerEle, sTop, 0, this.duration)
      this.$emit('on-click')
    }
  }
}
</script>
<style>
  .backTop_wrap{
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 70px;
    bottom: 150px;
  }
  .backTop{
    background-color: rgba(0,0,0,.6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: all 0.2s ease-in-out;
  }
  .backTop i {
    color: #fff;
    font-size: 24px;
    padding: 8px 12px;
  }
</style>
