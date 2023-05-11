import './assets/css/main.css'
import 'tailwindcss/tailwind.css'
// import 'ant-design-vue/dist/antd.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import * as Icons from '@ant-design/icons-vue'
import { i18n } from './plugins/i18n'
import Antd from 'ant-design-vue'
import config from './plugins/config'
// import 'ant-design-vue/es/message/style/css'
import { setupRouter } from '@/router/index'
const app = createApp(App)
// 注册图标组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
app.use(i18n, {})
// setupRouter(app)
app.use(config)
app.use(Antd)
app.use(createPinia())
// app.use(router)

// app.mount('#app')

async function setupApp() {
  // 挂载路由
  await setupRouter(app)

  app.mount('#app')
}

setupApp()
