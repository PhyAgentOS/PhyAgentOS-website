import fs from 'fs'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// 开发期 React 检查插件，依赖的 Babel 插件未声明完整，会导致 dev 启动报错，暂时禁用
// import { inspectAttr } from 'kimi-plugin-inspect-react'

function cleanUrlsForDocs() {
  return {
    name: 'clean-urls-for-docs',
    configureServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        const url = req.url || ''
        if (url.startsWith('/docs/')) {
          const cleanUrl = url.split('?')[0]
          // Let static server handle files/assets/diagrams/images
          if (path.extname(cleanUrl)) {
            return next()
          }
          const candidates = cleanUrl.endsWith('/')
            ? [cleanUrl + 'index.html']
            : [cleanUrl + '/index.html', cleanUrl + '.html']
          for (const htmlUrl of candidates) {
            if (fs.existsSync(path.join(server.config.publicDir, htmlUrl))) {
              req.url = htmlUrl + (url.includes('?') ? '?' + url.split('?')[1] : '')
              return next()
            }
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), cleanUrlsForDocs()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
