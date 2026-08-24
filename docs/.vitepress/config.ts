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
  title: 'PhyAgentOS 文档',
  description: '统一、透明、可审计的物理智能体运行底座',
  base: '/docs/',
  cleanUrls: true,
  outDir: '../public/docs',
  ignoreDeadLinks: true,
  lastUpdated: false,
  buildEnd() {
    buildToDirectories(outDir)
  },
  head: [
    ['link', { rel: 'icon', href: '/imgs/logo.png' }],
  ],
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'PhyAgentOS 文档',
      description: '统一、透明、可审计的物理智能体运行底座',
      themeConfig: {
        nav: [
          { text: '系统架构', link: '/architecture/' },
          { text: '用户手册', link: '/api-reference/' },
          { text: '开发者指南', link: '/developer-guide/' },
          { text: '技术报告', link: '/tech-report.pdf' },
          { text: 'GitHub', link: 'https://github.com/PhyAgentOS/PhyAgentOS-core' },
          { text: '官网首页', link: 'https://phy-agent-os.net/' },
        ],
        sidebar: {
          '/architecture/': [
            {
              text: '系统架构',
              link: '/architecture/',
              items: [
                { text: '项目定位', link: '/architecture/#_1-项目定位' },
                { text: '当前架构', link: '/architecture/#_2-当前架构' },
                { text: '文件协议', link: '/architecture/#_3-文件协议' },
                { text: '已实现能力', link: '/architecture/#_4-当前已实现能力' },
                { text: 'v0.1.6 范围', link: '/architecture/#_5-v0-1-6-版本范围' },
                { text: '后续设计方向', link: '/architecture/#_6-后续设计方向' },
                { text: '代码结构', link: '/architecture/#_7-代码结构' },
                { text: '架构图', link: '/architecture/#_8-架构图' },
              ],
            },
          ],
          '/api-reference/': [
            {
              text: '用户手册',
              link: '/api-reference/',
              items: [
                { text: '快速开始', link: '/api-reference/quick-start/' },
                { text: '安装配置', link: '/api-reference/configuration/' },
                { text: 'CLI 参考', link: '/api-reference/cli-reference/' },
                { text: 'Runtime Session', link: '/api-reference/runtime-session/' },
                { text: '运维与排障', link: '/api-reference/operations/' },
              ],
            },
          ],
          '/developer-guide/': [
            {
              text: '开发者指南',
              link: '/developer-guide/',
              items: [
                { text: '核心接口与 Schema', link: '/developer-guide/core-interfaces/' },
                { text: '扩展流程', link: '/developer-guide/extension/' },
                { text: 'Target / Skill / Policy / Perception 集成', link: '/developer-guide/integration/' },
                { text: '通信协议与 RPC 边界', link: '/developer-guide/communication/' },
              ],
            },
          ],
        },
        footer: {
          message: 'PhyAgentOS — 自进化物理智能体操作系统',
          copyright: 'MIT Licensed',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'PhyAgentOS Docs',
      description: 'A unified, transparent, and auditable runtime foundation for physical agents',
      themeConfig: {
        nav: [
          { text: 'Architecture', link: '/en/architecture/' },
          { text: 'User Manual', link: '/en/api-reference/' },
          { text: 'Developer Guide', link: '/en/developer-guide/' },
          { text: 'Technical Report', link: '/tech-report.pdf' },
          { text: 'GitHub', link: 'https://github.com/PhyAgentOS/PhyAgentOS-core' },
          { text: 'Home', link: 'https://phy-agent-os.net/' },
        ],
        sidebar: {
          '/en/architecture/': [
            {
              text: 'Architecture',
              link: '/en/architecture/',
              items: [
                { text: 'Project Positioning', link: '/en/architecture/#_1-project-positioning' },
                { text: 'Current Architecture', link: '/en/architecture/#_2-current-architecture' },
                { text: 'File Protocol', link: '/en/architecture/#_3-file-protocol' },
                { text: 'Implemented Capabilities', link: '/en/architecture/#_4-implemented-capabilities' },
                { text: 'v0.1.6 Scope', link: '/en/architecture/#_5-v0-1-6-scope' },
                { text: 'Future Design Direction', link: '/en/architecture/#_6-future-design-direction' },
                { text: 'Repository Structure', link: '/en/architecture/#_7-repository-structure' },
                { text: 'Architecture Diagrams', link: '/en/architecture/#_8-architecture-diagrams' },
              ],
            },
          ],
          '/en/api-reference/': [
            {
              text: 'User Manual',
              link: '/en/api-reference/',
              items: [
                { text: 'Quick Start', link: '/en/api-reference/quick-start/' },
                { text: 'Configuration', link: '/en/api-reference/configuration/' },
                { text: 'CLI Reference', link: '/en/api-reference/cli-reference/' },
                { text: 'Runtime Session', link: '/en/api-reference/runtime-session/' },
                { text: 'Operations & Troubleshooting', link: '/en/api-reference/operations/' },
              ],
            },
          ],
          '/en/developer-guide/': [
            {
              text: 'Developer Guide',
              link: '/en/developer-guide/',
              items: [
                { text: 'Core Interfaces & Schemas', link: '/en/developer-guide/core-interfaces/' },
                { text: 'Extension Workflow', link: '/en/developer-guide/extension/' },
                { text: 'Target / Skill / Policy / Perception Integration', link: '/en/developer-guide/integration/' },
                { text: 'Communication Protocol & RPC Boundaries', link: '/en/developer-guide/communication/' },
              ],
            },
          ],
        },
        footer: {
          message: 'PhyAgentOS — Self-Evolving Physical Agent Operating System',
          copyright: 'MIT Licensed',
        },
      },
    },
  },
  themeConfig: {
    logo: '/imgs/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PhyAgentOS/PhyAgentOS-core' },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: 'deep',
    },
  },
})
