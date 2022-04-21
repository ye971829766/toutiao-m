<template>
  <div class="layout-container">
    <router-view/>
    <van-tabbar class="layout-tabbar" route>
    <van-tabbar-item replace to="/home">
       <span>首页</span>
        <i slot="icon" class="toutiao toutiao-shouye"></i>
      </van-tabbar-item>
        <van-tabbar-item replace to="/qa">
        <span>问答</span>
        <i slot="icon" class="toutiao toutiao-wenda"></i>
      </van-tabbar-item>
        <van-tabbar-item replace to="/video">
        <span>视频</span>
        <i slot="icon" class="toutiao toutiao-shipin"></i>
      </van-tabbar-item>
        <van-tabbar-item replace to="/my">
        <span>{{$store.state.user ? '我的' : '未登录' }}</span>
        <i slot="icon" class="toutiao toutiao-wode"></i>
      </van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',

  data () {
    return {
      active: 0
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
  .layout-container{
    .layout-tabbar{
      .toutiao{
        font-size: 40px;
      }
      span{
        font-size: 22px;
      }
  }
}
</style>
