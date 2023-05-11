<template>
  <div class="footer">
    <div>版本:{{ version }}</div>
    <div>{{ config.VUE_APP_UAM_LOGIN_ITEM }}</div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const version = computed(() => {
  return import.meta.env.VITE_VUE_APP_VERSION
})
</script>
<style scoped lang="less">
.footer {
  height: 32px;
  padding: 0 10px;
  background-color: var(--color-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
