# OptiNetSim 光网络仿真平台 - 前端

## 项目简介

OptiNetSim 是一个光网络仿真平台的前端工程，基于 Vue.js 框架开发，提供了光网络拓扑编辑、设备配置、频谱分析等功能。该前端工程与后端服务配合，为用户提供直观的光网络仿真可视化界面。

主要功能包括：
- 用户登录/注册
- 网络拓扑编辑与可视化
- 设备参数配置
- 频谱信息配置
- 全局仿真参数设置

## 技术栈

- Vue 3 (Composition API)
- Pinia (状态管理)
- Vue Router
- Axios (HTTP 请求)
- Vite (构建工具)
- SCSS (样式预处理)

## 安装与运行步骤

### 前置要求

确保已安装以下环境：
- Node.js (建议版本 16.x 或更高)
- npm (通常随 Node.js 一起安装)

### 1. 克隆项目

```bash
git clone https://github.com/OptiNetSim/OptiNetSim-fontend.git
cd OptiNetSim-fontend
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境

根据您的后端服务地址，可能需要修改 `src/api` 目录下的相关文件中的基础 URL。

### 4. 运行开发服务器

```bash
npm run dev
```

开发服务器启动后，默认会在浏览器中打开 `http://localhost:5173`。

### 5. 构建生产版本

```bash
npm run build
```

构建完成后，生产文件会生成在 `dist` 目录中。

### 6. 运行测试

```bash
npm run test
```

## 项目结构说明

```
src/
├── api/            - 接口请求封装
├── assets/         - 静态资源
├── components/     - 公共组件
├── router/         - 路由配置
├── stores/         - 状态管理
├── styles/         - 全局样式
├── utils/          - 工具函数
└── views/          - 页面视图
```

## 贡献指南

欢迎提交 Pull Request 或 Issue。提交代码前请确保：
1. 通过 ESLint 检查
2. 添加适当的单元测试
3. 更新相关文档

## 许可证

本项目采用 [MIT 许可证](LICENSE)。