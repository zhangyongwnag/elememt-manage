<template>
  <div class="side-menu-wrapper">
    <el-menu mode="vertical" class="el-menu-vertical-demo" menu-trigger="click" ref="menu" :collapse="menuStatus" collapse-transition unique-opened :default-active="activeName" active-text-color="#007AFF" :default-openeds="openedNames" @select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <el-menu-item v-else :index="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`" v-waves><common-icon :type="item.children[0].icon || ''" style="margin-right: 12px"/><span>{{ showTitle(item.children[0]) }}</span></el-menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <el-menu-item v-else :index="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''" style="margin-right: 12px"/><span>{{ showTitle(item) }}</span></el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    },
    menuStatus:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === 'Home') this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames (v) {
      // this.$nextTick(() => {
        // this.$refs.menu.updateOpened()
      // })
    },
  },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style>
  .side-menu-wrapper {
    user-select: none;
  }
  .side-menu-wrapper .menu-collapsed {
    padding-top: 10px;
  }
  .side-menu-wrapper .menu-collapsed .ivu-dropdown {
    width: 100%;
  }
  .side-menu-wrapper .menu-collapsed .ivu-dropdown .ivu-dropdown-rel a {
    width: 100%;
  }
  .side-menu-wrapper .menu-collapsed .ivu-tooltip {
    width: 100%;
  }
  .side-menu-wrapper .menu-collapsed .ivu-tooltip .ivu-tooltip-rel {
    width: 100%;
  }
  .side-menu-wrapper .menu-collapsed .ivu-tooltip .ivu-tooltip-popper .ivu-tooltip-content .ivu-tooltip-arrow {
    border-right-color: #fff;
  }
  .side-menu-wrapper .menu-collapsed .ivu-tooltip .ivu-tooltip-popper .ivu-tooltip-content .ivu-tooltip-inner {
    background: #fff;
    color: #495060;
  }
  .side-menu-wrapper a.drop-menu-a {
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
  .menu-title {
    padding-left: 6px;
  }

</style>
