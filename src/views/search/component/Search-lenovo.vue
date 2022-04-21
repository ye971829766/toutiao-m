<template>
  <div class="search-lenove">
    <van-cell center v-for="(item,index) in SuggestsList" :key="index" @click="$emit('sendTxt' , item)">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-icon name="search" slot="icon" class="search-icon" />
        <div slot="title" v-html="changeTxtcolor(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { searchSuggests } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchLenovo',

  props: {
    searchTxt: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      SuggestsList: []
    }
  },

  watch: {
    searchTxt: {
      // 防抖处理
      handler: debounce(function (value) {
        this.getsearchSuggests(value)
      }, 200),
      // handler (value) {
      //   this.getsearchSuggests(value)
      //   console.log(value)
      // },
      immediate: true
    }
  },

  methods: {
    async getsearchSuggests (q) {
      try {
        const { data: res } = await searchSuggests(q)
        this.SuggestsList = res.data.options
      } catch (err) {
        this.$toast('网络请求错误')
      }
    },
    changeTxtcolor (text) {
      if (text === null) {
        return
      }
      const txt = `<span class="active">${this.searchTxt}</span>`
      const reg = new RegExp(this.searchTxt, 'gi')
      return text.replace(reg, txt)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-lenove{
   /deep/ .active{
      color: #3296fa;
    }
  }
</style>
