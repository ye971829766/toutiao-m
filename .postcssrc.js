module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 把px转为rem
    'postcss-pxtorem': {
      //
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性
      //*表示所有
      propList: ['*'],

      // 排除要转为rem的样式
      exclude:'github-markdown'
    }
  }
}