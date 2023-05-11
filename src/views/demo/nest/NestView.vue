<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>嵌套菜单</div>
  <div class="one">
    <div class="two"></div>
  </div>
  <RouterView />
</template>

<style scoped>
.one {
  overflow: hidden;
}
.two {
  width: 100px;
  height: 100px;
  background: url(/src/assets/image/icons/logo.svg);
}
.two:hover {
  transform: scale(1.8);
}
</style>
