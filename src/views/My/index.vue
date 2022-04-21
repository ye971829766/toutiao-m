<template>
  <div class="my-continer">
    <!-- 登录状态 -->
     <div class="header userinfo" v-if="user">
      <div class="top">
        <div class="user">
          <van-image
            class="user_pic"
            round
            fit="cover"
            :src="userinfo.photo"
          />
          <span class="username">{{userinfo.name}}</span>
          </div>
         <van-button round type="default" size="mini" class="btn" to="/user/profile">编辑资料</van-button>
      </div>
      <div class="bottom">
        <div class="info">
          <span class="count">8</span>
          <span class="text">头条</span>
        </div>
         <div class="info">
          <span class="count">8</span>
          <span class="text">关注</span>
        </div>
         <div class="info">
          <span class="count">8</span>
          <span class="text">粉丝</span>
        </div>
         <div class="info">
          <span class="count">8</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录状态 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="">
        <span>登录 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2" class="data-grid" clickable>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="shoucang">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="lishi">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-button type="default" size="large" v-if="user"  @click="exit">
      <span class="exit">退出登录</span>
    </van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { UserInfo } from '@/api/user'
export default {
  name: 'MyIndex',

  data () {
    return {
      userinfo: {}
    }
  },

  mounted () {

  },

  methods: {
    exit () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo () {
      try {
        const { data: res } = await UserInfo()
        console.log(res)
        this.userinfo = res.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后再试')
      }
    }
  },

  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  }
}
</script>
<style lang="less" scoped>
  .my-continer{
    .header{
      height: 361px;
      background: url("~@/assets/banner.png") no-repeat;
      background-size: cover;
    }
   .not-login{
     display: flex;
     justify-content: center;
     align-items: center;
     .login-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        height: 132px;
      }
      span{
        margin-top: 15px;
        font-size: 28px;
        color: #ffff;
      }
     }
   }
    .userinfo{
      .top{
        box-sizing:border-box;
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 226px;
        .user_pic{
          width: 132px;
          height: 132px;
          margin-right: 22px;
          border: 2px solid #fff;
        }
        .user{
          display: flex;
          align-items: center;
        }
        .username{
          font-size: 30px;
          color: #fff;
        }
      }
      .bottom{
        // height: 130px;
        display: flex;
        .info{
          height: 135px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count{
            font-size: 36px;
          }
          .text{
            font-size: 23px;
          }
        }
      }
    }
    .btn{
      color: #666;
    }
    .data-grid{
      height: 142px !important;
      .toutiao{
        font-size: 45px;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .lishi{
        font-size: 28px;
      }
      .shoucang{
        font-size: 28px;
      }
    }
    .exit{
      color: #d86262;
    }
  }

</style>
