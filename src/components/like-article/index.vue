<template>
     <van-icon
      :color="value===1? 'red':''"
      :name="value===1? 'good-job':'good-job-o'"
      :loading="loading"
      @click="Like"
      />
</template>

<script>
import { likeArticle, dellikeArticle } from '@/api/likeArticle.js'
export default {
  name: 'likeArticle',

  data () {
    return {
      loading: false
    }
  },

  props: {
    value: {
      type: Number,
      required: true
    },
    id: {
      type: [String, Number, Object],
      required: true
    }
  },

  methods: {
    async Like () {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          // 取消点赞
          await dellikeArticle(this.id)
        } else {
          // 点赞
          await likeArticle(this.id)
          status = 1
          this.$toast('点赞成功')
        }
        this.$emit('input', status)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
