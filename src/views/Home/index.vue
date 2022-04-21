<template>
  <div class="home-contianer">
    <!-- 顶部搜索栏 -->
   <van-nav-bar class="page-nav-bar" fixed>
     <van-button
     class="search-btn"
     slot="title"
     type="info"
     size="small"
     round
     icon="search"
     to="/search"
     >搜索</van-button>
   </van-nav-bar>
   <!-- 导航栏 -->
   <van-tabs v-model="active" type="line"  class="channel-tabs" animated swipeable>
    <van-tab :title="item.name" v-for="item in channelsList"
    :key="item.id"

    >
    <ArticleList :channel="item"></ArticleList>
    </van-tab>
    <div slot="nav-right" class="placeholder"></div>
    <div slot="nav-right" class="right" @click="showChannelList">
      <i class="toutiao toutiao-gengduo"></i>
    </div>
   </van-tabs>
   <!-- 汉堡弹出层 -->
    <van-popup
      v-model="Channelshow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '70%' }"
    >
    <ChannelEdit :mychannel="channelsList" :active="active" @active-change="changeActive"></ChannelEdit>
    </van-popup>
   <!-- /汉堡弹出层 -->
  </div>
</template>

<script>
import ArticleList from './component/article-list.vue'
import { Channels } from '@/api/user'
import ChannelEdit from '@/views/Home/component/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',

  computed: {
    ...mapState(['user'])
  },

  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channelsList: [],
      Channelshow: false
    }
  },

  mounted () {

  },

  methods: {
    // 获取频道列表数据
    async getChannels () {
      try {
        let channels = []
        if (this.user) {
          // 登录状态
          const { data: res } = await Channels()
          channels = res.data.channels
        } else {
          // 未登录状态
          const localPannel = getItem('channels')
          if (localPannel) {
            // 如果本地有数据就用本地的，没有就发起请求用默认的
            channels = localPannel
          } else {
            const { data: res } = await Channels()
            channels = res.data.channels
          }
        }
        this.channelsList = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    showChannelList () {
      this.Channelshow = true
    },
    changeActive (index, Channelshow = false) {
      this.active = index
      this.Channelshow = Channelshow
    }
  },

  created () {
    this.getChannels()
  }
}
</script>
<style lang="less" scoped>
::v-deep .van-nav-bar__title{
  max-width:unset;
}
  .home-contianer{
    padding-bottom: 100px;
    .search-btn{
      background-color: #5BABFB;
      width: 555px;
      height: 64px;
      font-size: 28px;
      border: none;
    }

   /deep/ .channel-tabs{
      padding-top: 172px;
      .right{
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 66px;
        height: 82px;
        opacity: 0.9;
        i.toutiao{
          font-size: 30px;
        }
        .placeholder{
        width: 66px;
        height: 82px;
        flex-shrink: 0;
        }
        &::before{
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 58px;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
      .van-tab--active{
        color: #333 !important;
      }
      .van-tabs__wrap{
        position: fixed;
        top: 92px;
        right: 0;
        left: 0;
        z-index: 1;
        height: 82px;
      }
      .van-tab{
        font-size: 30px;
        color: #777777;
        min-width: 200px;
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
    }
      ::v-deep .van-tabs__line{
          margin-bottom: 10px;
          width: 31px;
          height: 6px;
          background-color: #3296fa;
        }
  }
</style>
