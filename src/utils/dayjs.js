import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs默认语言是英文，我们这里配置为中文
dayjs.locale('zh-cn')
// 处理相对时间的插件
dayjs.extend(relativeTime)
Vue.filter('relativeTime', value => {
  return dayjs().to(value)
})
