<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      @click="publishComment"
      :disabled="!message.length"
      class="post-btn"
    >发布</van-button>
  </div>
</template>

<script>
import { Comment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },

  inject: {
    id: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async publishComment () {
      try {
        const { data: res } = await Comment({
          target: this.target,
          content: this.message,
          art_id: this.id ? this.id.toString() : null
        })
        console.log(res)
        // 清空文本框
        this.message = ''
        this.$toast('发布成功')
        // 关闭文本框
        // 将评论显示在列表顶部
        this.$emit('ipSuccess', res.data)
      } catch (err) {
        this.$toast('发布评论失败，请检查网络')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
