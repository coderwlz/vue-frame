<template>
  <div class="logo">
    <span v-if="!collapsed" class="bg">
      <img v-show="!config.VUE_APP_UAM_LOGO_MENU" src="/src/assets/image/img/logo.png" />
      <img v-show="config.VUE_APP_UAM_LOGO_MENU" :src="config.VUE_APP_UAM_LOGO_MENU" />
    </span>
    <span v-else class="bg2">
      <img v-show="!config.VUE_APP_UAM_LOGO_MENU_SMELL" src="/src/assets/image/img/logo2.png" />
      <img v-show="config.VUE_APP_UAM_LOGO_MENU_SMELL" :src="config.VUE_APP_UAM_LOGO_MENU_SMELL" />
    </span>
  </div>
</template>
<script setup>
defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="less" scoped>
.logo {
  padding: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.bg2 {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
