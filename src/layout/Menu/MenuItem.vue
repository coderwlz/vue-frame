<template>
  <template v-for="item in menus">
    <a-menu-item
      v-if="!isShowSubMenu(item) && !item.meta.hideInMenu"
      :key="item.path"
      @click="goPath(item)"
    >
      <component :is="item.meta.icon"></component>
      <span>{{ item.meta.title }}</span>
    </a-menu-item>
    <a-sub-menu :key="item.path" v-if="isShowSubMenu(item) && !item.meta.hideInMenu">
      <template #icon>
        <component :is="item.meta.icon"></component>
      </template>
      <template #title>{{ item.meta.title }}</template>
      <MyMenuItem :menus="item?.children"></MyMenuItem>
    </a-sub-menu>
  </template>
</template>
<script setup>
import MyMenuItem from '/src/layout/Menu/MenuItem.vue'
import { useTabsViewStore } from '@/stores/tabsView.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabsViewStore = useTabsViewStore()
// 标签页列表
const { tabsList, activeKey, selectedKeys, openKeys } = storeToRefs(tabsViewStore)
defineProps({
  menus: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const isShowSubMenu = (menuItem) => {
  return menuItem.meta.type === 1
}
const goPath = (item) => {
  console.log(item, 'openKeys', openKeys)
  let flag = false
  tabsList.value.forEach((val) => {
    if (val.path == item.path) {
      flag = true
    }
  })
  if (!flag) {
    tabsList.value.push(item)
  }
  console.log(tabsList.value)
  activeKey.value = item.path
  selectedKeys.value = [item.path]
  openKeys.value = item.meta.parent
  router.push(item.meta.path)
}
</script>
