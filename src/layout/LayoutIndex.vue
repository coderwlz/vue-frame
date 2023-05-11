<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <logo-view :collapsed="collapsed"></logo-view>
      <menu-view></menu-view>
    </a-layout-sider>
    <a-layout>
      <header-view :collapsed="collapsed" @checkCollapsed="checkCollapsed"></header-view>
      <tabs-view></tabs-view>
      <a-layout-content
        class="main-content"
        :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
      <FooterView></FooterView>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import LogoView from '@/layout/Logo/LogoView.vue'
import MenuView from './Menu/MenuView.vue'
import HeaderView from '@/layout/Header/HeaderView.vue'
import TabsView from './Tabs/TabsView.vue'
import FooterView from './Footer/FooterView.vue'
const collapsed = ref(false)
const checkCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
}
.theme-default {
  .layout {
    .main-content {
      background: #fff !important;
    }
  }
}
.theme-dark {
  .layout {
    .main-content {
      background: #000 !important;
    }
  }
}
</style>
