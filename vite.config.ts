import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
const ASSET_PATH = process.env.ASSET_PATH || ''
import packageConfig from './package.json' assert { type: 'json' }

console.log(`Base path is ${ASSET_PATH}`)

const transformIndexPlugin = () => {
  return {
    name: 'transformIndex',
    transformIndexHtml(html) {
      return html.replace(
        '$$version$$',
        packageConfig.version,
      )
    },
  }
}

const renameIndexPlugin = (newFilename:string) => {
  if (!newFilename) return

  return {
    name: 'renameIndex',
    enforce: 'post' as 'post' | 'pre',
    generateBundle(options, bundle) {
      const indexHtml = bundle['index.html']
      indexHtml.fileName = newFilename
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: ASSET_PATH,
  assetsInclude: ['**/*.glb','**/*.env','**/*.hdr'],
  server: { 
    https: true, 
    port:8080 , 
    host: '0.0.0.0'
  },
  plugins: [
    react(),
    basicSsl(),
    transformIndexPlugin(),
    renameIndexPlugin(`index-${packageConfig.version}.html`)
  ],
  esbuild: {
    //drop: ['console','debugger']
  }
})
