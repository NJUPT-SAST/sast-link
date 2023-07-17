# SAST-Link-Demo

## 介绍

本仓库是 SAST-Link 的前端部分。关于 SAST-Link，请移步: [关于 SAST-Link](https://njuptsast.feishu.cn/wiki/wikcnH1EW60rsChyrSxruAkXVEe)

## 文档

[SAST-Link 文档](https://njuptsast.feishu.cn/wiki/wikcnH1EW60rsChyrSxruAkXVEe)

## 相关技术栈

- 框架：[Next.js](https://nextjs.org/)
- 开发语言：[TypeScript](https://www.typescriptlang.org/)
- CSS 扩展语言：[SASS](https://sass-lang.com/)
- UI 组件库：本项目未使用 UI 组件库。
- API 相关：[Axios](https://axios-http.com/)
- 全局状态管理：[Redux](https://redux.js.org/)
- 其他：待补充

## 项目结构

```txt
\sast-link
├── app // 存放主体界面
│  ├── (turist) // 游客可访问界面
│  │  ├── login // 存放 login 界面文件
│  │  ├── regist // 存放 regist 界面文件
│  │  └── layout.tsx // 布局文件
│  ├── (user) // 用户可访问界面
│  │  ├── home //用户主页
│  │  └── layout.tsx 布局文件
│  ├── favicon.ico // 网页图标
│  ├── global.scss // 全局样式
│  ├── login.tsx // 登陆界面
│  ├── page.module.scss // 当前路径下组件样式
│  └── layout.tsx // 全局布局
├── components // 存放自定义组件
│  ├── example1
│  │  ├── index.module.scss // 组件的样式
│  │  └── index.tsx // 组件主体代码与集中导出的位置
│  └── example2
│      ├── index.module.scss
│      └── index.tsx
├── lib
│  ├── apis // 存放 api
│  └── func // 自定义函数库
├── node_modules // 依赖
├── public // 公共文件存放处
│  ├── fonts // 字体文件
│  │  └── index.ts
│  └── svg // 各种 icon
├── redux // 存放全局状态
│  ├── features // 存放包含 Reducer 的文件夹
│  └── index.ts // 存放 config
├── styles // 样式
│  ├── globals.scss // 全局样式
│  ├── Home.module.scss
│  ├── Login.module.scss
│  ├── Regist.module.scss
│  └── types.d.ts
├── types
├── next-env.d.ts
├── .eslintrc.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

## 开发指北

本项目使用 [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) 构建，路由结构采用 [App Router](https://nextjs.org/docs/app) 的形式。

### 依赖安装

使用 pnpm 进行包管理，混用其他包管理器可能会导致未知错误

### 实时预览

```shell
pnpm dev
```

### 项目打包

```shell
pnpm build
```

### 代码检查

- 使用空格缩进，默认两空格
- 使用 `pnpm css-fix` 来对 css 进行修复。

### 代码提交

待补充

## TODO

- [ ] Home 界面
- [ ] 添加请求的错误处理
- [ ] 添加 error、loading 界面
- [ ] message 组件，预计使用单例模式, 用于登录、注册等界面的交互反馈
- [ ] 优化文件结构
