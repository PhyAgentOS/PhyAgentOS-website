import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../../public/docs')

function buildToDirectories(root: string) {
  const skipDirs = ['assets', 'diagrams', 'imgs']
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (skipDirs.includes(entry.name)) continue
        walk(fullPath)
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.html') &&
        entry.name !== 'index.html' &&
        entry.name !== '404.html'
      ) {
        const folderName = entry.name.slice(0, -5)
        const targetDir = path.join(dir, folderName)
        fs.mkdirSync(targetDir, { recursive: true })
        fs.renameSync(fullPath, path.join(targetDir, 'index.html'))
      }
    }
  }
  walk(root)
}

export default defineConfig({
  title: 'PhyAgentOS Docs 1.0.0',
  description: 'PhyAgentOS 1.0.0 documentation for Forge Skills, Tool APIs, recovery, and evolution',
  base: '/docs/',
  cleanUrls: true,
  outDir: '../public/docs',
  lastUpdated: false,
  buildEnd() {
    buildToDirectories(outDir)
  },
  head: [
    ['link', { rel: 'icon', href: '/docs/imgs/logo.png' }],
  ],
  themeConfig: {
    logo: '/imgs/logo.png',
    nav: [
      { text: '文档首页', link: '/' },
      {
        text: '中文',
        items: [
          { text: '框架介绍', link: '/zh/01-framework-introduction/' },
          { text: '用户手册', link: '/zh/02-user-manual/' },
          { text: '开发者手册', link: '/zh/03-developer-manual/' },
          { text: 'Forge 配置参考', link: '/zh/04-forge-configuration-reference/' },
          { text: 'Agent 经验与 Skill 自进化', link: '/zh/05-agent-experience-and-skill-evolution/' },
        ],
      },
      {
        text: 'English',
        items: [
          { text: 'Documentation Home', link: '/en/' },
          { text: 'Framework Introduction', link: '/en/01-framework-introduction/' },
          { text: 'User Manual', link: '/en/02-user-manual/' },
          { text: 'Developer Manual', link: '/en/03-developer-manual/' },
          { text: 'Forge Configuration Reference', link: '/en/04-forge-configuration-reference/' },
          { text: 'Agent Experience and Skill Evolution', link: '/en/05-agent-experience-and-skill-evolution/' },
        ],
      },
      {
        text: '专题 / Focused',
        items: [
          { text: '运行手册', link: '/user_manual/README/' },
          { text: 'Docker 部署指南', link: '/user_manual/DOCKER/' },
          { text: '集成开发指南', link: '/user_development_guide/README/' },
          { text: '通信架构', link: '/user_development_guide/COMMUNICATION/' },
          { text: 'Operations Manual', link: '/user_manual/README_en/' },
          { text: 'Docker Deployment Guide', link: '/user_manual/DOCKER_en/' },
          { text: 'Integration Development Guide', link: '/user_development_guide/README_en/' },
          { text: 'Communication Architecture', link: '/user_development_guide/COMMUNICATION_en/' },
        ],
      },
      {
        text: 'Forge',
        items: [
          { text: 'Tool API 接入契约', link: '/forge/README_zh/' },
          { text: 'Tool API Integration Contract', link: '/forge/README/' },
          { text: '统一 Tool API / Unified Tool API', link: '/forge/UNIFIED_TOOL_API/' },
        ],
      },
      { text: 'v1.0.0', link: '/' },
      { text: '技术报告', link: '/docs/tech-report.pdf' },
      { text: 'GitHub', link: 'https://github.com/PhyAgentOS/PhyAgentOS-core' },
      { text: '官网首页', link: 'https://phy-agent-os.net/' },
    ],
    sidebar: {
      '/zh/': [
        {
          text: 'PhyAgentOS 1.0.0 核心手册',
          items: [
            { text: '框架介绍', link: '/zh/01-framework-introduction/' },
            { text: '用户手册', link: '/zh/02-user-manual/' },
            { text: '开发者手册', link: '/zh/03-developer-manual/' },
            { text: 'Forge 配置参考', link: '/zh/04-forge-configuration-reference/' },
            { text: 'Agent 经验与 Skill 自进化', link: '/zh/05-agent-experience-and-skill-evolution/' },
          ],
        },
      ],
      '/en/': [
        {
          text: 'PhyAgentOS 1.0.0 Core Manuals',
          items: [
            { text: 'Documentation Home', link: '/en/' },
            { text: 'Framework Introduction', link: '/en/01-framework-introduction/' },
            { text: 'User Manual', link: '/en/02-user-manual/' },
            { text: 'Developer Manual', link: '/en/03-developer-manual/' },
            { text: 'Forge Configuration Reference', link: '/en/04-forge-configuration-reference/' },
            { text: 'Agent Experience and Skill Evolution', link: '/en/05-agent-experience-and-skill-evolution/' },
            { text: 'Operations Manual', link: '/user_manual/README_en/' },
            { text: 'Integration Development Guide', link: '/user_development_guide/README_en/' },
            { text: 'Forge Tool API Contract', link: '/forge/README/' },
          ],
        },
      ],
      '/user_manual/': [
        {
          text: '运行与部署 / Operations',
          items: [
            { text: '运行手册（中文）', link: '/user_manual/README/' },
            { text: 'Docker 部署（中文）', link: '/user_manual/DOCKER/' },
            { text: 'Operations Manual (English)', link: '/user_manual/README_en/' },
            { text: 'Docker Deployment (English)', link: '/user_manual/DOCKER_en/' },
          ],
        },
      ],
      '/user_development_guide/': [
        {
          text: '集成开发 / Integration',
          items: [
            { text: '集成开发指南（中文）', link: '/user_development_guide/README/' },
            { text: '通信架构（中文）', link: '/user_development_guide/COMMUNICATION/' },
            { text: 'Integration Guide (English)', link: '/user_development_guide/README_en/' },
            { text: 'Communication (English)', link: '/user_development_guide/COMMUNICATION_en/' },
          ],
        },
      ],
      '/forge/': [
        {
          text: 'Forge Tool API',
          items: [
            { text: '接入契约（中文）', link: '/forge/README_zh/' },
            { text: 'Integration Contract (English)', link: '/forge/README/' },
            { text: '统一 Tool API（双语）', link: '/forge/UNIFIED_TOOL_API/' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PhyAgentOS/PhyAgentOS-core' },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: 'deep',
    },
    footer: {
      message: 'PhyAgentOS — 递归自进化物理智能体操作系统',
      copyright: 'MIT Licensed',
    },
  },
})
