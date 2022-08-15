const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://pentesting-28.github.io/test_agence_frontend/',
  },
  publicPath: '/test_agence_frontend/'
  
})
