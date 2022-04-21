<template>
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{commentT.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{commentT.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{commentT.pubdate | relativeTime}}</span>
            <van-button
            size="mini"
            type="default"
            @click="$emit('sendcommentT' , commentT)"
            >回复{{commentT.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon"
        :name="commentT.is_liking? 'good-job' : 'good-job-o'"
        :class="{color:commentT.is_liking}"
        :loading="likeloading"
        @click="like"
        >
          {{commentT.like_count>0? commentT.like_count:'赞'}}
        </van-icon>
      </van-cell>
    <!-- 评论列表 -->
</template>

<script>
import { like, donlike } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      likeloading: false,
      commentT: this.comment
    }
  },
  methods: {
    async like () {
      this.likeloading = true
      try {
        if (this.comment.is_liking) {
          // 取消点赞
          await donlike(this.comment.com_id)
          this.commentT.like_count--
        } else {
          // 点赞
          await like(this.comment.com_id)
          this.commentT.like_count++
        }
      } catch (err) {

      }
      this.commentT.is_liking = !this.commentT.is_liking
      this.likeloading = false
    }
  }
}
</script>
<style scoped lang="less">
  .color{
    color: red;
  }
  .van-list {
    margin-bottom: 45px;
  }
</style>
