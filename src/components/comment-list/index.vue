<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  :immediate-check="false"
  @load="onLoad"
>
  <articleComment v-for="(item,index) in list" :key="index" :comment="item" @sendcommentT="$emit('sendCommentT' , $event)"/>
</van-list>
</template>

<script>
import { commentList } from '@/api/comment'
import articleComment from '@/components/article-comment.vue'
export default {
  name: 'commentList',

  components: {
    articleComment
  },

  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
      commentlist: this.list
    }
  },

  created () {
    this.loading = true
    this.onLoad()
  },

  props: {
    id: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },

  methods: {
    async onLoad () {
      this.loading = true
      try {
        const { data: res } = await commentList({
          type: this.type,
          source: this.id,
          offset: this.offset,
          limit: this.limit
        })
        this.commentlist.push(...res.data.results)
        // 向父组件发送文章总数
        this.$emit('totalcount', res.data)
        this.loading = false
        if (res.data.results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
        this.$toast('网络错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
