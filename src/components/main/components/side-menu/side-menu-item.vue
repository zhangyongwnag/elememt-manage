<template>
  <el-submenu :index="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :parent-item="item"></side-menu-item>
        <el-menu-item v-else :index="getNameOrHref(item, true)" ><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></el-menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :parent-item="item"></side-menu-item>
        <el-menu-item v-else :index="getNameOrHref(item)" ><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></el-menu-item>
      </template>
    </template>
  </el-submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>
