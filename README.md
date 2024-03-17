# SAST Link

![SAST Link Logo](https://aliyun.sastimg.mxte.cc/images/2023/07/02/footera9663bd5ff4b2bad.png)

Logo designed by [SAST](https://sast.fun/), created by [Maxtune Lee](https://github.com/MaxtuneLee).

[![License](https://img.shields.io/badge/license-AGPLv3-blue.svg)](https://choosealicense.com/licenses/agpl-3.0/)

SAST Link is a comprehensive personnel management system and OAuth designed to provide a secure and efficient way to manage and authorize access to your applications and services.

Product design in Figma: [SAST Link](https://www.figma.com/file/IUIoRll3ieYFzJSfJPelDu/sast-link?node-id=0-1&t=rtc1sJfjJ0aTDAkp-0), designed by [Maxtune Lee](https://github.com/MaxtuneLee)

This repository contains the frontend code for SAST Link. If you're interested in the backend, please visit [SAST Link backend](https://github.com/NJUPT-SAST/sast-link-backend).

SAST Link frontend is built with TypeScript and SCSS, and use Next.js as the web framework.

> [!WARNING]
> This repo is under active development! Formats, schemas, and APIs are subject to rapid and backward incompatible changes!

## Get Started

### Pre-requisites

- Node.js >= 20
- pnpm >= 8

### Clone and Run

To get started, clone the repository and install dependencies with:

```bash
git clone https://github.com/NJUPT-SAST/sast-link.git
cd sast-link
pnpm intsall
```

To start a dev server, run:

```bash
pnpm dev
```

To compile for production deployment, run:

```bash
pnpm build
```

The output will be in the `.next` directory, you can run it with:

```bash
pnpm start
```

### Project Structure

```txt
sast-link
├── app
│  ├── (tourist)
│  │  ├── login
│  │  ├── regist
│  │  └── layout.tsx
│  ├── (user)
│  │  ├── home //用户主页
│  │  └── layout.tsx 布局文件
│  ├── favicon.ico
│  ├── global.scss
│  ├── login.tsx
│  ├── page.module.scss
│  └── layout.tsx
├── components
│  ├── example1
│  │  ├── index.module.scss
│  │  └── index.tsx
│  └── example2
│      ├── index.module.scss
│      └── index.tsx
├── lib
│  ├── apis
│  └── func
├── node_modules
├── public
│  ├── fonts
│  │  └── index.ts
│  └── svg
├── redux
│  ├── features
│  └── index.ts
├── styles
│  ├── globals.scss
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

## Development

### API Documentation

The API documentation is available at [wiki of the backend](https://github.com/NJUPT-SAST/sast-link-backend/wiki/Api-Doc)

### Code Workflow Explanation

TODO

## Roadmap

Goals and Vision for SAST Link (SAST OAuth and SAST Profile):

### SAST OAuth

SAST OAuth serves as a unified identity authentication system for SAST, facilitating login across multiple SAST applications.

Example:

- Simplifies login processes for SAST members across various projects, such as the FreshCup competition.
- Enables seamless login via SAST credentials without the need for separate accounts for each project.
- Allows SAST lecturers to access and manage the FreshCup competition system for tasks like grading via SAST login.
- Offers multiple login options including SAST Feishu, PassKey, QQ, Github, etc., providing users with convenience and flexibility.
- Implements additional security measures like F2A and security keys to enhance account security.

In login process, users can choose to log in in multiple ways: SAST Feishu, PassKey, QQ, Github, etc. As long as they have been bound in advance, they can use third-party login, which is convenient and fast. They can also use F2A, security keys, and other methods to enhance account security.

### SAST Profile

SAST Profile acts as a centralized user profile system for managing user information and settings within SAST applications.

Features:

- Records basic user information such as SAST membership status, current position, department, group affiliation, etc.
- Tracks user activities within SAST, including competition results, awards, and permissions across various applications.
- Provides users with the ability to customize and share their profile page, allowing them to control the visibility of their information.

## Contributing

Pull requests and any feedback are welcome. For major changes, please open an issue first to discuss what you would like to change.

> [!warning]
> Prior to submitting a pull request, please ensure that your code is properly formatted, linted and builds successfully.

### Contributors

[![Contributors](https://contrib.rocks/image?repo=NJUPT-SAST/sast-link)]("https://github.com/NJUPT-SAST/sast-link/graphs/contributors")

## License

[AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
