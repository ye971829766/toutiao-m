/* eslint-disable vue/valid-v-on */
<template>
<div>
 <van-nav-bar
 class="scope-warp"
  :title="comment.reply_count > 0? comment.reply_count+'条回复':  '暂无回复'"
>
<van-icon name="clear" slot="left" @click="$emit('close')"/>
</van-nav-bar>
 <div class="scroll-warp">
   <articcleComment :comment="comment"></articcleComment>
<van-cell title="全部回复"/>
<commentlist :id="comment.com_id" type="c" :list="commentList"></commentlist>
 </div>

<div class="discuss-warp">
   <div class="discuss">
     <van-button type="default" class="discuss" round @click="show=true">发布评论</van-button>
   </div>
</div>
<van-popup
  v-model="show"
  closeable
  position="bottom"
  :style="{ height: '30%' }"
>
<!-- // eslint-disable-next-line vue/valid-v-on -->
<commentPost :target="comment.com_id" @ipSuccess="success"></commentPost>
</van-popup>
 </div>
</template>

<script>
import articcleComment from '@/components/article-comment.vue'
import commentlist from '@/components/comment-list'
import commentPost from '@/components/commentpost'
export default {
  name: 'commentReoly',

  data () {
    return {
      show: false,
      commentF: this.comment,
      commentList: []
    }
  },

  components: {
    articcleComment,
    commentlist,
    commentPost
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  methods: {
    success (data) {
      this.show = false
      this.commentF.reply_count++
      this.commentList.push(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
      .scroll-warp{
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        bottom: 88px;
        overflow-y: auto;
      }
  .discuss-warp{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 88px;
    font-size: 22px;
    .discuss{
      width: 60%;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .van-nav-bar .van-icon{
      color: black;
    }
  }

</style>
