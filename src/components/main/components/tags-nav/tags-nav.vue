<template>
  <div class="tags-nav">
    <div class="close-con">
      <el-dropdown @command="handleTagsOption" style="margin-top:8px;">
        <div type="text">
          <i class="el-icon-circle-close" />
        </div>
        <el-dropdown-menu slot="dropdown" v-waves>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="others">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ul v-show="visible" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
      <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
    </ul>
    <div class="btn-con left-btn" v-active @click="handleScroll(240)">
      <div>
        <i :size="18" class="el-icon-arrow-left" />
      </div>
    </div>
    <div class="btn-con right-btn" v-active @click="handleScroll(-240)">
      <div>
        <i :size="18" class="el-icon-arrow-right" />
      </div>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <el-tag
            closeable
            v-for="(item, index) in list"
            :disable-transitions='true'
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :name="item.name"
            :data-route-item="item"
            @close="handleClose(item)"
            @click="handleClick(item)"
            :closable="item.name !== 'Home'"
            @contextmenu.prevent.native="contextMenu(item, $event)"
            class="tags"
            effect="dark"
            :class="isCurrentTag(item) ? 'tagsActive' : ''"
            v-waves
          >{{ showTitleInside(item) }}</el-tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { showTitle, routeEqual } from '@/libs/util'
import beforeClose from '@/router/before-close'
export default {
  name: 'TagsNav',
  props: {
    value: Object,
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: '关闭其他',
        all: '关闭所有'
      },
      routeName:'',
    }
  },
  computed: {
    currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  methods: {
    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption (type) {
      if (type.includes('all')) {
        // 关闭所有，除了home
        let res = this.list.filter(item => item.name === 'Home')
        this.$emit('on-close', res, 'all')
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === 'Home')
        this.$emit('on-close', res, 'others', this.currentRouteObj)
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj)
        }, 100)
      }
    },
    handleClose (current) {
      if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
          if (close) {
            this.close(current)
          }
        })
      } else {
        this.close(current)
      }
    },
    close (route) {
      let res = this.list.filter(item => !routeEqual(route, item))
      this.$emit('on-close', res, undefined, route)
    },
    handleClick (item) {
      this.$emit('input', item)
      this.routeName = item.name
    },
    showTitleInside (item) {
      return showTitle(item, this)
    },
    isCurrentTag (item) {
      return routeEqual(this.currentRouteObj, item)
    },
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByRoute (route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    },
    contextMenu (item, e) {
      if (item.name === 'Home') {
        return
      }
      this.visible = true
      const offsetLeft = this.$el.getBoundingClientRect().left
      this.contextMenuLeft = e.clientX - offsetLeft + 10
      this.contextMenuTop = e.clientY - 64
    },
    closeMenu () {
      this.visible = false
    }
  },
  watch: {
    '$route' (to) {
      this.getTagElementByRoute(to)
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  }
}
</script>

<style scoped>
  .size{
    width: 100%;
    height: 100%;
  }
  .tags-nav {
    position: relative;
    border-top: 1px solid rgba(238,247,255,1);
    /*border-bottom: 1px solid rgba(238,247,255,1);*/
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .no-select ,.size ,.close-con{
    position: absolute;
    right: 0;
    top: 0;
    height: 38px;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 38px;
    background: #fff;
    padding-top: 5px;
    z-index: 10;
  }
  .btn-con div{
    padding: 6px 5px;
    line-height: 16px;
    text-align: center;
  }
  .left-btn{
    left: 0px;
    border-right: 1px rgba(238,247,255,1) solid;
  }
  .right-btn{
    right: 32px;
    border-right: 1px rgba(238,247,255,1) solid;
    border-left: 1px rgba(238,247,255,1) solid;
  }
  .scroll-outer {
    background-color: #fff;
    height:38px;
    position: absolute;
    left: 23px;
    right: 56px;
    top: 0;
    bottom: 0;
    /*box-shadow: 0px 0 1px 1px rgba(100, 100, 100, .1) inset;*/
  }
  .scroll-body {
    height:calc(100% - 1px);
    display: inline-block;
    /*padding: 1px 4px 0;*/
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    transition: left .3s ease;
  }
  .ivu-tag-dot-inner{
    transition: background .2s ease;
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .1);
  }
  .contextmenu li {
    margin: 0;
    padding: 5px 15px;
    cursor: pointer;
  }
  .contextmenu li:hover {
    background-color: #eee;
  }
  .tags{
    padding: 0 15px;
    box-sizing: border-box;
    height: 38px;
    border-radius: 0px;
    border: 0px;
    background-color: #fff;
    color:#606266;
    line-height: 38px;
    margin:0px;
  }
  .tagsActive{
    height: 37px;
    background-color: rgba(246,247,248,1);
    border-bottom: 2px #007aff solid;
  }
</style>
