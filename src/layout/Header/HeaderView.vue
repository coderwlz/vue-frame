<template>
  <a-layout-header class="layout-header" style="background: #fff">
    <div class="layout-header-left">
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="checkCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="checkCollapsed" />
      <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item v-for="(val, index) in list" :key="val.path"
          >{{ val.meta.title }}
          <template v-if="val.children.length" #overlay>
            <a-menu :selectedKeys="getSelectKeys(index)">
              <template v-for="item in val.children">
                <a-menu-item
                  v-if="!item.meta.hideInBreadcrumb"
                  :key="getKey(item.path)"
                  @click="clickItem(item)"
                >
                  <a>{{ item.meta.title }}</a>
                </a-menu-item>
              </template>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="layout-header-right">
      <a-space :size="20">
        <search-outlined />
        <lock-outlined @click="setLock" />
        <fullscreen-outlined />
        <a-avatar>
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <setting-outlined />
      </a-space>
    </div>
  </a-layout-header>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTabsViewStore } from '@/stores/tabsView.js'
import { storeToRefs } from 'pinia'

const setLock = () => {}
const tabsViewStore = useTabsViewStore()
// 标签页列表
const { tabsList, activeKey, selectedKeys, openKeys } = storeToRefs(tabsViewStore)

const router = useRouter()
console.log('router.currentRoute.value.matched.', router.currentRoute.value)
defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['checkCollapsed'])
const checkCollapsed = () => {
  emit('checkCollapsed')
}

const list = computed(() => {
  return router.currentRoute.value.matched
})

const clickItem = (item) => {
  console.log(item)

  if (item.meta.type == 1) {
    console.log('getParent(item.children)', getParent(item.children))
    openKeys.value = getParent(item.children).meta.parent
    activeKey.value = getParent(item.children).path
    selectedKeys.value = [getParent(item.children).path]
  } else {
    openKeys.value = item.meta.parent
    let flag = false
    tabsList.value.forEach((val) => {
      if (val.path == item.path) {
        flag = true
      }
    })
    if (!flag) {
      tabsList.value.push(item)
    }
    activeKey.value = item.path
    selectedKeys.value = [item.path]
  }

  router.push(item.meta.path)
}
const getSelectKeys = (val) => {
  return ['/' + router.currentRoute.value.matched[val + 1]?.meta.name]
}
const getKey = (val) => {
  return `/${val}`.replace('//', '/')
}
const getParent = (arr) => {
  let parent = []
  getItem(arr)
  function getItem(arrs) {
    if (arrs[0].meta.type == 1) {
      getItem(arrs[0].children)
    } else {
      parent = arrs[0]
    }
  }
  return parent
}
</script>
<style lang="less">
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 20px;
  .layout-header-left {
    cursor: pointer;
    display: flex;
    align-items: center;
    .breadcrumb {
      display: flex;
      align-items: center;
      margin-left: 15px;
    }
  }
}
</style>
