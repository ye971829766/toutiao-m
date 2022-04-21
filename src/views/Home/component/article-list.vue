<template>
  <div class="article-list">
    <van-pull-refresh class="xiala" v-model="isLoadingrefresh"
    @refresh="onRefresh"
    :success-text="info"
    :success-duration="1000"
    >
    <van-list
  v-model="loading"
  :finished="finished"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
  <Article
  v-for="(item,index) in list"
  :key="index"
  :article="item"
  ></Article>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import Article from '@/components/article-item'
export default {
  name: 'ArticleList',

  components: {
    Article
  },

  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      time: null,
      isLoadingrefresh: false,
      info: ''
    }
  },

  mounted () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data: res } = await getArticle({
          channel_id: this.channel.id,
          // 向服务端发送时间戳，如果time有数据，则发送time的时间戳，如果没有，获取当前的时间戳，第一次请求默认获取当前时间戳
          timestamp: this.time || Date.now()
        })
        this.list.push(...res.data.results)
        this.loading = false
        // 判断返回的数据是否为空
        if (res.data.results.length) {
          this.time = res.data.pre_timestamp
        } else {
          // 如果为空，显示已经没有数据
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
        this.$toast('加载失败，请重试')
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now() // 每次获取最新数据
        })
        // 将最新数据数据追加到列表顶部
        this.list.unshift(...res.data.results)
        // 还原顶部加载状态
        this.isLoadingrefresh = false
        // 刷新成功信息提示
        this.info = `刷新成功，更新了${res.data.results.length}条数据`
        // 判断返回的数据是否为空
        if (res.data.results.length === 0) {
          // 如果为空，显示已经没有数据
          this.finished = true
        }
      } catch (err) {
        this.isLoadingrefresh = false
        this.info = '刷新失败'
        this.$toast('加载失败，请重试')
      }
    }
  }
}

</script>

<style lang="less" scoped>
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
