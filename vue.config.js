module.exports = {
  "devServer": {
    "proxy": {
      "/api": {
        "target": "https://grey-matter-backend.herokuapp.com/api",
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