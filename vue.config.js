const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test_agence_frontend/'
    : '/',
  // devServer: {
  //   proxy: 'https://pentesting-28.github.io/test_agence_frontend/',
  // },
  // publicPath: '/test_agence_frontend/'
  // devServer: {
  //   proxy: 'hhttp://localhost:8080',
  // }
})
