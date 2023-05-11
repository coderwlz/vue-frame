import { createRouter, createWebHistory } from 'vue-router'
import common from './staticModules/index'
import { REDIRECT_ROUTE } from './staticModules/besidesLayout'
export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard/welcome',
    meta: {
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/LayoutIndex.vue'),
    children: [...common, REDIRECT_ROUTE]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "layout" */ '@/views/login/LoginView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export const getItemPath = (path) => {
  let str = ''
  routes[0].children.forEach((item) => {
    item.children.forEach((val) => {
      if (path == val.path) {
        str = item.path + '/' + path
      }
    })
  })

  return str
}
export const getPrentPath = (path) => {
  let str = ''
  getPath(routes[0].children)
  function getPath(arr) {
    arr.forEach((item) => {
      if (path == item.path) {
        str = item
      }
      if (item.meta.type == 1) {
        getPath(item.children)
      }
    })
  }

  return str
}
export async function setupRouter(app) {
  app.use(router)

  // 路由准备就绪后挂载APP实例
  await router.isReady()
}

export default router
