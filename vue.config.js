const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost:3456/login/',
  //       changeOrigin: true,
  //     }
  //   }
  // }
})
