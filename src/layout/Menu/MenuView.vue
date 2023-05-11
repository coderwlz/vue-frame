<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    :mode="isSideMenu ? 'inline' : 'horizontal'"
    :open-keys="isSideMenu ? openKeys : []"
  >
    <MenuItem :menus="menuList"></MenuItem>
  </a-menu>
</template>
<script setup>
import { computed } from 'vue'
import { useTabsViewStore } from '@/stores/tabsView.js'
import { storeToRefs } from 'pinia'
import MenuItem from '/src/layout/Menu/MenuItem.vue'
import common from '@/router/staticModules/index'

const tabsViewStore = useTabsViewStore()
// 标签页列表
const { selectedKeys, openKeys } = storeToRefs(tabsViewStore)

const getMenuList = (list) => {
  return list
}

const menuList = getMenuList(common)

/** 侧边栏布局 */
const isSideMenu = computed(() => true)
</script>
<style lang="less" scoped>
.menu-item {
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
}
</style>
