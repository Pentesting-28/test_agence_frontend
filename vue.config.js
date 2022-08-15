const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:8080',
  },
  publicPath: '/test_agence_frontend/'
  
})
