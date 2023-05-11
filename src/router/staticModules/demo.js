const moduleName = 'demo'

const routes = [
  {
    path: '/demo',
    name: moduleName,
    redirect: '/demo/nest',
    meta: {
      icon: 'DesktopOutlined',
      title: 'demo演示',
      type: 1,
      name: 'demo',
      path: `/${moduleName}`
    },
    children: [
      {
        path: 'nest',
        name: `${moduleName}-nest`,
        redirect: '/demo/nest/nest1',
        meta: {
          icon: 'DesktopOutlined',
          title: '嵌套菜单',
          type: 1,
          path: `/${moduleName}/nest`,
          name: 'nest'
        },
        component: () =>
          import(/* webpackChunkName: "dashboard-welcome" */ '@/views/demo/nest/NestView.vue'),
        children: [
          {
            path: 'nest1',
            name: `${moduleName}-nest1`,
            meta: {
              icon: 'DesktopOutlined',
              title: '嵌套菜单-1',
              path: `/${moduleName}/nest/nest1`,
              parent: ['/demo', 'nest'],
              name: 'nest1'
            },
            component: () =>
              import(
                /* webpackChunkName: "dashboard-welcome" */ '@/views/demo/nest1/NestView1.vue'
              ),
            children: []
          }
        ]
      }
    ]
  }
]

export default routes
