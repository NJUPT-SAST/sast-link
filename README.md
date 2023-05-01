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
- API 相关：预计使用 [Axios](https://axios-http.com/)
- 全局状态管理：未定
- 其他：待补充## 安装依赖

## 项目结构

``` txt
\sast-link
├── components
│  ├── example1
│  │  ├── index.module.scss
│  │  └── index.tsx
│  └── example2
│      ├── index.module.scss
│      └── index.tsx
├── lib
├── node_modules
├── pages
│  ├── 404.tsx
│  ├── index.tsx
│  ├── login.tsx
│  ├── regist.tsx
│  ├── test.tsx
│  ├── _app.tsx
│  └── _document.tsx
├── public
│  ├── favicon.ico
│  ├── fonts
│  │  └── index.ts
│  └── svg
├── styles
│  ├── globals.scss
│  ├── Home.module.scss
│  ├── Login.module.scss
│  ├── Regist.module.scss
│  └── types.d.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
└── type
   └── class
```

## 开发指北

本项目使用 [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) 构建

### 依赖安装

  使用 pnpm 进行包管理，混用其他包管理器可能会导致未知错误

### 实时预览

``` shell
pnpm dev
```

### 项目打包

``` shell
pnpm build
```

### 代码检查

- 使用空格缩进，默认两空格
- 使用 `pnpm css-fix` 来对 css 进行修复。

### 代码提交

待补充

## TODO

- [X] 首页 account 可选中与聚焦高亮
- [ ] 首页 accountList 滚动高度调整与关闭按钮的聚焦高亮
- [ ] 首页 逻辑
- [ ] Button => focus 等样式
- [X] register 图标
- [X] message 组件，预计使用单例模式
- [ ] notify 组件，预计使用单例模式
- [ ] 联调（不急，接口没写完）
