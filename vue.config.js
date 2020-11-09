// vue.config.js
module.exports = {
    // options...
    devServer: {
      proxy: {
        '/api': {
          target: 'https://localhost:8080',//'https://corporatecontacts.club/LAMPAPI',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,
          secure: false
        }
      }
    }
  }