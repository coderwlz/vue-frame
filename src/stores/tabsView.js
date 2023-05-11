import { ref } from 'vue'
import { TABS_ROUTES } from '@/enums/cacheEnum'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useTabsViewStore = defineStore('useTabsViewStore', () => {
  const router = useRouter()
  const currentRoute = router.currentRoute.value

  let list = JSON.parse(localStorage.getItem(TABS_ROUTES))
  const tabsList = ref(list || [])
  const activeKey = ref(tabsList.value[0]?.path || '')
  const selectedKeys = ref([])
  const openKeys = ref([])
  console.log('currentRoute', currentRoute)
  console.log('tabsList', tabsList)
  tabsList.value.forEach((item) => {
    if (currentRoute.path.includes(item.path)) {
      activeKey.value = item.path
      openKeys.value = item.meta.parent
      selectedKeys.value = [item.path]
    }
  })
  return { tabsList, activeKey, selectedKeys, openKeys }
})
