# vue-frame

This template should help get you started developing with Vue 3 in Vite.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```
vue-frame
├─ public
├─ README.md
├─ src
│  ├─ api				 // 统一api
│  ├─ App.vue	
│  ├─ assets
│  │  ├─ css		     // 公共样式
│  │  │  ├─ base.css     // 全局样式变量
│  │  │  └─ main.css  
│  │  └─ image
│  │     ├─ icons        // 存放svg
│  │     └─ img	   		 // 存放图片
│  ├─ components         // 组件
│  ├─ enums              // 定义全局使用的常量
│  ├─ hooks				 // 公共hook
│  ├─ layout			 // 结构组件
│  ├─ main.js 			 // 项目入口
│  ├─ plugins			 // 自定义插件
│  ├─ router             // 路由
│  ├─ stores			 // store
│  ├─ utils				 // 公共工具函数
│  └─ views				 // 界面
└─ vite.config.js		 // 项目配置文件
```