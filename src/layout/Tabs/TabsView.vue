<template>
  <div class="layout-tabs">
    <a-tabs
      class="layout-tab"
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @change="tabClick"
    >
      <a-tab-pane
        v-for="pane in tabsList"
        :key="pane.path"
        :tab="pane.meta.title"
        :closable="pane.closable"
      ></a-tab-pane>
    </a-tabs>
    <a-dropdown :trigger="['click']">
      <down-outlined class="layout-action" />
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="reloadPage"><sync-outlined /> 重新加载 </a-menu-item>
          <a-menu-item key="1" @click="closeItem"> <close-outlined />关闭标签页 </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" @click="closeOther"
            ><column-width-outlined />关闭其他标签页</a-menu-item
          >
          <a-menu-item key="4" @click="allClose"><line-outlined />关闭全部标签页</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup>
import { TABS_ROUTES } from '@/enums/cacheEnum'
import { useTabsViewStore } from '@/stores/tabsView.js'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { getPrentPath } from '@/router/index.js'
import { message } from 'ant-design-vue'
import { REDIRECT_NAME } from '@/router/constant'
import { unref } from 'vue'

const route = useRoute()
const router = useRouter()
const tabsViewStore = useTabsViewStore()
// 标签页列表
const { tabsList, activeKey, selectedKeys, openKeys } = storeToRefs(tabsViewStore)

if (tabsList.value.length == 0) {
  tabsList.value = [
    {
      path: 'welcome',
      name: `dashboard-welcome`,
      meta: {
        title: '工作台',
        icon: 'BankOutlined',
        path: `/dashboard/welcome`,
        parent: ['/dashboard'],
        name: 'welcome'
      }
    }
  ]
}

const remove = (targetKey) => {
  if (tabsList.value.length == 1) {
    return message.warn('这已经是最后一页，不能再关闭了！')
  }
  let lastIndex = 0
  tabsList.value.forEach((pane, i) => {
    if (pane.path === targetKey) {
      lastIndex = i - 1
    }
  })
  tabsList.value = tabsList.value.filter((pane) => pane.path !== targetKey)
  let active = {}
  if (tabsList.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = tabsList.value[lastIndex].path
      active = tabsList.value[lastIndex]
    } else {
      activeKey.value = tabsList.value[0].path
      active = tabsList.value[0]
    }
    const path = tabsList.value[tabsList.value.length - 1].path
    openKeys.value = active.meta.parent
    selectedKeys.value = [path]
    router.push(active.meta.path)
  }
}
const onEdit = (targetKey) => {
  remove(targetKey)
}
const tabClick = (key) => {
  let routeItem = getPrentPath(key)
  openKeys.value = routeItem.meta.parent
  selectedKeys.value = [key]
  router.push(routeItem?.meta?.path || '/')
}

const closeItem = () => {
  remove(activeKey.value)
}

const closeOther = () => {
  tabsList.value = tabsList.value.filter((pane) => pane.path == activeKey.value)
}
const allClose = () => {
  tabsList.value = [
    {
      path: 'welcome',
      name: `dashboard-welcome`,
      meta: {
        title: '工作台',
        icon: 'BankOutlined',
        path: `/dashboard/welcome`,
        parent: ['/dashboard'],
        name: 'welcome'
      }
    }
  ]
  activeKey.value = 'welcome'
  openKeys.value = tabsList.value[0].meta.parent
  selectedKeys.value = [activeKey.value]
  router.push('/')
}
// 刷新页面
const reloadPage = () => {
  router.replace({
    name: REDIRECT_NAME,
    params: {
      path: unref(route).fullPath
    }
  })
}

// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
  localStorage.setItem(TABS_ROUTES, JSON.stringify(tabsList.value))
})
</script>
<style lang="less" scoped>
.layout-tabs {
  background: white;
  padding-top: 5px;
  padding-left: 10px;
  height: 45px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  .layout-tab {
    flex: 1;
  }
  .layout-action {
    margin-right: 20px;
    position: relative;
    top: 8px;
    font-size: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
