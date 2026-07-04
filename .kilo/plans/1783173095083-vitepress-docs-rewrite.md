# 基于 GitHub docs 重写 PhyAgentOS 网站文档站（VitePress）

## 目标

将 GitHub `pre-commit` 分支 `/docs` 下的 Markdown 文档内容，转换并部署到项目官网 `phy-agent-os.net/docs/` 上，使其比现有静态 HTML 文档更美观、易读、易维护。首页 3 张文档入口卡片（Architecture / API Reference / Developer Guide）的标题与视觉样式保持不变，仅更新其指向的内容。

## 现状

- 网站当前是 React + Vite 单页应用，位于 `/app`。
- 现有文档站是手写静态 HTML，位于 `/app/public/docs/`：
  - `/docs/en/architecture.html`
  - `/docs/en/api-reference.html`
  - `/docs/en/developer-guide.html`
  - 以及大量子目录（`api-usage/`、`development-guide/` 等）和 `docs-common.css`。
- GitHub `pre-commit` 分支的文档内容：
  - `README.md` / `README_zh.md`
  - `docs/README.md`
  - `docs/en/01-framework-introduction.md`
  - `docs/en/02-user-manual.md`
  - `docs/en/03-developer-manual.md`
  - `docs/zh/01-framework-introduction.md`
  - `docs/zh/02-user-manual.md`
  - `docs/zh/03-developer-manual.md`
  - `docs/user_manual/README.md` / `README_en.md`
  - `docs/user_development_guide/README.md` / `README_en.md`
  - `docs/user_development_guide/COMMUNICATION.md` / `COMMUNICATION_en.md`
  - `docs/imgs/*` 及 HTML 架构图（`agent-architecture.html` 等）

## 已确认的关键决策

| 决策项 | 选择 |
|--------|------|
| 文档技术栈 | **VitePress**（与主站 Vite 栈一致、构建快、主题现代） |
| VitePress 项目位置 | `/app/docs/`（独立 `package.json`、配置、内容） |
| 构建输出 | `/app/public/docs/`，覆盖旧静态 HTML |
| 旧文件处理 | **完全删除** `/app/public/docs/` 下现有静态 HTML/CSS/子目录，由 VitePress 重新生成 |
| 多语言 | VitePress i18n；默认中文：`/docs/`；英文：`/docs/en/` |
| URL 形式 | **clean URL**（无 `.html`），同步更新首页 3 张卡片的 `href` |
| 内容策略 | 以 GitHub Markdown 原文为主，只做最小格式修正；按 3 大入口重新组织 |
| 视觉风格 | VitePress 默认主题 + 注入主站品牌色（accent color、字体、圆角） |
| 架构图 | 将 GitHub 的 HTML 架构图作为静态资源复制到 VitePress `public/`，在页面中链接或 iframe 引用 |
| 构建流程 | 先运行 `/app/docs/` 的 `npm run docs:build`，再运行主站 `/app/` 的 `npm run build` |

## 内容映射

### 入口 1：Architecture（架构）

- 源文件：`docs/en/01-framework-introduction.md` / `docs/zh/01-framework-introduction.md`
- 目标路径：
  - `/docs/architecture/`（中文）
  - `/docs/en/architecture/`（英文）
- 可选侧边栏子项：
  - Overview
  - Architecture
  - Protocol Files
  - Project Structure
  - Supported Targets

### 入口 2：API Reference（用户手册 / 使用参考）

- 源文件：`docs/en/02-user-manual.md` + `docs/user_manual/README_en.md` / `docs/zh/02-user-manual.md` + `docs/user_manual/README.md`
- 目标路径：
  - `/docs/api-reference/`（中文）
  - `/docs/en/api-reference/`（英文）
- 侧边栏建议：
  - 快速开始（Quick Start）
  - 安装配置（Installation & Configuration）
  - CLI 参考
  - Runtime Session
  - 运维与排障（Operations / Troubleshooting）

### 入口 3：Developer Guide（开发指南）

- 源文件：`docs/en/03-developer-manual.md` + `docs/user_development_guide/README_en.md` + `docs/user_development_guide/COMMUNICATION_en.md` / 对应中文文件
- 目标路径：
  - `/docs/developer-guide/`（中文）
  - `/docs/en/developer-guide/`（英文）
- 侧边栏建议：
  - 核心接口与 Schema
  - 扩展流程
  - Target / Skill / Policy / Perception 集成
  - 通信协议与 RPC 边界

### 静态资源

- 图片：`docs/imgs/*` → 复制到 `/app/docs/public/imgs/`
- 架构图 HTML：`docs/agent-architecture.html`、`docs/benchmarking-architecture.html`、`docs/session-verifier-architecture.html` 及对应 `.en.html` → 复制到 `/app/docs/public/diagrams/`
- 在 Markdown 中通过相对路径或 iframe 引用这些资源。

## 目标目录结构

```
/app
├── docs/                          # VitePress 文档项目（新增）
│   ├── .vitepress/
│   │   ├── config.ts              # VitePress 配置（i18n、主题、导航、侧边栏）
│   │   ├── theme/
│   │   │   ├── index.ts           # 自定义主题入口
│   │   │   └── style.css          # 品牌色注入
│   │   └── en.ts / zh.ts          # 中英导航/侧边栏配置（可选拆分）
│   ├── en/
│   │   ├── architecture.md
│   │   ├── api-reference/
│   │   │   ├── index.md
│   │   │   ├── quick-start.md
│   │   │   ├── configuration.md
│   │   │   ├── cli-reference.md
│   │   │   ├── runtime-session.md
│   │   │   └── operations.md
│   │   └── developer-guide/
│   │       ├── index.md
│   │       ├── core-interfaces.md
│   │       ├── extension.md
│   │       ├── integration.md
│   │       └── communication.md
│   ├── architecture.md            # 中文首页入口
│   ├── api-reference/
│   │   └── ...（中文）
│   ├── developer-guide/
│   │   └── ...（中文）
│   ├── index.md                   # /docs/ 默认中文首页（可重定向到 /architecture/）
│   ├── en/index.md                # /docs/en/ 英文首页
│   ├── package.json
│   └── public/
│       └── imgs/                  # 图片与架构图资源
├── public/
│   └── docs/                      # VitePress 构建输出（.gitignore，不提交）
├── src/
│   └── sections/home/DocsCTA.tsx  # 更新 3 张卡片的 href
└── ...
```

## 实施步骤

1. **清理旧文档**
   - 删除 `/app/public/docs/` 下所有旧文件（HTML、CSS、子目录）。
   - 在 `/app/.gitignore` 中添加 `/public/docs/`（生成产物不提交）。

2. **初始化 VitePress**
   - 在 `/app/docs/` 创建 `package.json` 并安装依赖：`vitepress`、`vue`（peer）。
   - 创建 `.vitepress/config.ts`，配置 i18n：
     - `locales`：`root: { label: '中文', lang: 'zh-CN', link: '/' }`（默认中文）
     - `en: { label: 'English', lang: 'en-US', link: '/en/' }`
   - 设置 `cleanUrls: true`。
   - 设置 `outDir: '../public/docs'`。

3. **复制与整理内容**
   - 从 GitHub 下载/复制 6 份核心 Markdown 到 `/app/docs/` 对应目录。
   - 修正图片路径为 `/imgs/...`。
   - 将长文档按建议侧边栏拆分为子页面，保留原文标题层级。

4. **静态资源迁移**
   - 复制 `docs/imgs/` 到 `/app/docs/public/imgs/`。
   - 复制 HTML 架构图到 `/app/docs/public/diagrams/`。
   - 在相关 Markdown 中插入架构图链接或 iframe。

5. **主题品牌化**
   - 在 `.vitepress/theme/style.css` 中定义 CSS 变量：
     - 主色（brand accent）
     - 字体（匹配主站 `font-display` / `font-sans`）
     - 圆角、卡片阴影等
   - 在 `.vitepress/theme/index.ts` 中导入自定义样式。

6. **配置导航与侧边栏**
   - 顶部导航：Architecture、API Reference、Developer Guide、GitHub、官网首页。
   - 为 3 大入口分别配置英文和中文侧边栏。

7. **更新首页入口链接**
   - 在 `/app/src/sections/home/DocsCTA.tsx` 中更新 3 个 `href`：
     - `/docs/en/architecture/`
     - `/docs/en/api-reference/`
     - `/docs/en/developer-guide/`
   - 中文版本指向 `/docs/architecture/` 等。

8. **构建验证**
   - 在 `/app/docs/` 运行 `npm install` 和 `npm run docs:build`。
   - 确认 `/app/public/docs/` 生成：`index.html`、`en/index.html`、`architecture/index.html`、`en/architecture/index.html` 等。
   - 在 `/app/` 运行 `npm run build`，确认 `dist/docs/` 包含生成产物。
   - 本地 `npm run preview` 或 `vite preview` 访问 `/docs/`、`/docs/en/` 及各入口，检查链接、图片、架构图是否正常。

## 构建与部署流程

```bash
# 1. 构建文档站
cd /app/docs
npm install
npm run docs:build

# 2. 构建主站（会自动拷贝 public/docs/ 到 dist/）
cd /app
npm install
npm run build

# 3. 部署 dist/ 到托管服务
```

## 风险与注意事项

- **旧 URL 失效**：由于从 `.html` 改为 clean URL，旧书签 `.../architecture.html` 会 404。需要在托管层（如 Nginx、Cloudflare Pages、Vercel）配置从 `.html` 到 `/` 的 301 重定向，或保留 VitePress 的 `cleanUrls: true` 后由托管自动处理。
- **图片路径**：GitHub 文档中图片路径为 `docs/imgs/...`，复制到 VitePress 后需统一改为 `/imgs/...`。
- **i18n 首页**：默认 `/docs/` 是中文首页，需要设计一个 landing page 或自动重定向到 `/docs/architecture/`。
- **代码块高亮**：VitePress 默认支持；需确认 Python/Bash/JSON 代码块正常。
- **搜索**：VitePress 默认提供 local search；确认中英文索引正常。
- **GitHub 后续同步**：由于 Markdown 原文在 `/app/docs/` 内，后续 GitHub 文档更新时需要通过 diff 手动同步，或建立自动化同步脚本。

## 验证清单

- [ ] `/app/public/docs/` 旧文件已清空。
- [ ] VitePress 构建成功，无报错。
- [ ] `/app/public/docs/` 生成 `index.html`、`en/index.html`、`architecture/index.html` 等。
- [ ] 主站 `npm run build` 成功，且 `dist/docs/` 包含完整产物。
- [ ] 首页 3 张卡片链接指向新的 clean URL。
- [ ] 中英双语导航、侧边栏正常切换。
- [ ] 图片、架构图、代码块正常渲染。
- [ ] 移动端可读性良好。
- [ ] 旧 `.html` URL 已配置重定向（如托管环境支持）。

## 未纳入本计划（可选后续）

- 将 VitePress 构建步骤集成到 CI/CD（如 GitHub Actions）中。
- 增加文档站内搜索的国际化索引优化。
- 将架构图 HTML 转换为 VitePress 原生 Mermaid 或 SVG 图表，以减少 iframe 依赖。
