const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// module.exports = {
//   configureWebpack: {
//     devServer: {
//       headers: {
//         'Content-Security-Policy': 'default-src \'self\''
//       }
//     }
//   }
//  };

devServer:{
  https:false
}