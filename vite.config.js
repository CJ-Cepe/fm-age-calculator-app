// vite.config.js
const { defineConfig } = require('vite')
const path = require('path')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
