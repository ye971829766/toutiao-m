<template>
<!--
    动态路由传参
    方式1：
    :to="`/article/${article.art_id}`"
    方式2：
    :to="/article/"+article.art_id
    方式3：
     :to="{
      name:'article',
      params:{
        id:article.art_id
      }
    }"
 -->
    <van-cell
    class="article-item"
      :to="{
      name:'article',
      params:{
        id:article.art_id
      }
    }"
    >
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label">
       <div v-if="article.cover.type===3" class="threeimg">
          <div
          v-for="(img,index) in article.cover.images"
          :key="index"
          >
              <van-image
                class="cover-img"
                :src="img"
                fit="cover"
              />
        </div>
       </div>
       <div class="user">
         <span>{{article.aut_name}}</span>
         <span>{{article.comm_count}}</span>
         <span>{{article.pubdate | relativeTime}}</span>
       </div>
    </div>
    <van-image
      class="oneimg"
      v-if="article.cover.type===1"
      :src="article.cover.images[0]"
      fit="cover"
    />
    </van-cell>
</template>

<script>
export default {
  name: 'ToutiaoMIndex',

  props: {
    article: {
      type: Object,
      required: true
    }
  },

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
  .article-item{
    display: flex;
    /deep/ .van-cell__value{
        flex: unset;
        width: 232px;
        height: 146px;
    }
    .title{
      margin-bottom: 24px;
      font-size: 32px;
      text-overflow:ellipsis;
      color: #3a3a3a;
    }
    .user span{
      margin-right: 25px;
      font-size: 23px;
      color: #b4b4b4;
    }
   /deep/ .threeimg{
      display: flex;
      .van-image{
        padding-right:3px;
      }
      .van-image__img{
        flex: 1;
        height: 146px;
        .cover-img{
          width: 100%;
          height: 146px;
        }
      }
    }
   /deep/ .oneimg{
     .van-image__img{
        margin-left: 25px;
        width: 232px;
        height: 146px;
     }
    }
  }
</style>
