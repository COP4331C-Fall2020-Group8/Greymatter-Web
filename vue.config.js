module.exports = {
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:3000/api",
        "pathRewrite": {
          "^/api": ""
        },
        "changeOrigin": true,
        "secure": false
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}