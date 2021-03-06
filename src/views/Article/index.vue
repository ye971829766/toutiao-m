<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
    >
    <van-icon name="arrow-left" slot="left" @click="$router.back()"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"   v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title" ref="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"  center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
            <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="isloadingshow"
            @click="follow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="isloadingshow"
            @click="follow"
             :isFollowed="article.is_followed"
          @isFollowedState="article.is_followed=$event"
          >关注</van-button> -->
          <!-- v-model相当于
            value = article.is_followed 向子组件发送value
            @input="article.is_followed=$event" 子组件中监听input事件
           -->
          <FollowUser
          :userID="article.art_id"
          v-model="article.is_followed"
          class="follow-btn"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
          <div class="article-bottom">
            <van-button
              class="comment-btn"
              type="default"
              round
              size="small"
              @click="isPostShow=true"
            >写评论</van-button>
            <van-icon
              name="comment-o"
              :info="totalCommentCount"
              color="#777"
            />
            <collectArticle class="btn-item" :id="article.art_id" v-model="article.is_collected"/>
            <LikeArticle v-model="article.attitude" :id="article.art_id"></LikeArticle>
            <van-icon name="share" color="#777777"></van-icon>
          </div>
          <!-- /底部区域 -->
       <commentList :id="article.art_id" @totalcount="totalCommentCount=$event.total_count" :list="commentList" @sendCommentT="onReplyClick"></commentList>
          <van-popup
              v-model="isPostShow"
              position="bottom"
            >
            <commentPost :target="article.art_id" @ipSuccess="ipsuccess"></commentPost>
            </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->
      <div v-if="article.title" class="article-detail"></div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorState===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="errorshow">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="retry">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
      <van-popup
              v-model="reply"
              position="bottom"
              style="height:100%;"
            >
            <commentReply :comment="commentinfo" @close="reply=false"></commentReply>
            </van-popup>
    <!-- /评论回复 -->

  </div>
</template>

<script>
import '@/views/Article/github-markdown.css'
import { getArticleContent } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/followUser.vue'
import collectArticle from '@/components/collect'
import LikeArticle from '@/components/like-article'
import commentList from '@/components/comment-list'
import commentPost from '@/components/commentpost'
import commentReply from '@/components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    collectArticle,
    LikeArticle,
    commentList,
    commentPost,
    commentReply
  },
  provide: function () {
    return {
      id: this.id
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errorState: 1, // 加载状态状态码
      errorshow: false,
      isloadingshow: false,
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [],
      reply: false,
      commentinfo: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleContent()
  },
  methods: {
    async loadArticleContent () {
      this.loading = true
      try {
        const { data: res } = await getArticleContent(this.id)
        console.log(res)
        // 数据影响视图并不是立即的
        this.article = res.data
        // 如果想取得渲染后的dom，把执行语句设置为异步
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorState = 404
        } else {
          this.errorshow = true
        }
      }
      this.loading = false
    },
    retry () {
      this.loadArticleContent()
    },
    previewImage () {
      // 1、获取节点中所有的图片元素
      const articleContent = this.$refs['article-detail']
      const imgs = articleContent.querySelectorAll('img')
      // 2、定义一个空数组接收
      const imges = []
      // 3.遍历出每个图片
      imgs.forEach((img, index) => {
        imges.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imges,
            startPosition: index
          })
        }
      })
      // 4.调用vant images处理组件
    },
    ipsuccess (data) {
      this.isPostShow = false
      this.commentList.push(data.new_obj)
    },
    onReplyClick (commentT) {
      this.reply = true
      this.commentinfo = commentT
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
   /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
