const isProduction = process.env.NODE_ENV === 'production';

// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  "element-ui": "ELEMENT"
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js'
    ]
  }
}

module.exports = {
  // configureWebpack: config => {
  //   // 为生产环境修改配置...
  //   if (isProduction) {
  //     // externals
  //     config.externals = externals
  //   }
  // },
  // chainWebpack: config => {
  //   /**
  //    * 添加CDN参数到htmlWebpackPlugin配置中
  //    */
  //   config.plugin('html').tap(args => {
  //     if (IS_PROD) {
  //       args[0].cdn = cdn.build
  //     } else {
  //       args[0].cdn = cdn.dev
  //     }
  //     return args
  //   })
  // },
  devServer: {
    open: true, // 自动启动浏览器
    host: 'localhost', // localhost
    port: 8080, // 端口号
    https: false,
    hotOnly: false, // 热更新
    proxy: {
      '^/api': {
        target: 'http://localhost:8080', // 重写路径
        ws: true,   //开启WebSocket
        secure: false,      // 如果是https接口，需要配置这个参数
        changeOrigin: true
      }
    }
  }
}
// module.exports = {
//   devServer:{
//     port:8080, // 设置端口号
//     https:false, // https:{type:Boolean}
//     open:true, //配置自动启动浏览器
//   },
// }