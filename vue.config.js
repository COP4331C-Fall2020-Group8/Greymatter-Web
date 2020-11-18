// vue.config.js
module.exports = {
    // options...
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/api',//'https://grey-matter-backend.herokuapp.com/api',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,
          secure: false
        }
      }
    }
  }