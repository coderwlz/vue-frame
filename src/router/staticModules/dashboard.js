const moduleName = 'dashboard'

const routes = [
  {
    path: '/dashboard',
    name: moduleName,
    redirect: '/dashboard/welcome',
    meta: {
      icon: 'DashboardOutlined',
      title: '仪表盘',
      type: 1,
      name: 'dashboard',
      path: `/${moduleName}`
    },
    children: [
      {
        path: 'welcome',
        name: `${moduleName}-welcome`,
        meta: {
          icon: 'BankOutlined',
          title: '工作台',
          path: `/${moduleName}/welcome`,
          parent: ['/dashboard'],
          name: 'welcome'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard-welcome" */ '@/views/dashboard/welcome/WelcomeView.vue'
          )
      }
    ]
  }
]

export default routes
