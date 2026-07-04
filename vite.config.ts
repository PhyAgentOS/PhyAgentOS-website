import fs from 'fs'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { inspectAttr } from 'kimi-plugin-inspect-react'

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
  plugins: [inspectAttr(), react(), cleanUrlsForDocs()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
