<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" @click="Fn(item.art_id)"/>
    </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
  name: 'SearchResult',

  props: {
    searhtext: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20,
      error: false
    }
  },

  mounted () {

  },

  methods: {
    async onLoad () {
      // 1、请求获取数据
      try {
        const { data: res } = await searchResult({
          page: this.page,
          per_page: this.perpage,
          q: this.searhtext
        })
        const result = res.data.results
        // 2、将数据装进数组
        this.list.push(...result)
        // 3、将loding改为false
        this.loading = false
        // 4、判断还有没有数据
        if (result.length) {
          // 5、如果有，页码加1，否则finished为true
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.$toast('网络错误')
      }
    },
    Fn (id) {
      this.$router.push(`/article/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
