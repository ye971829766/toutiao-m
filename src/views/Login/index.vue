<template>
  <div class="login-container">
    <!-- 导航栏 -->
   <van-nav-bar class="page-nav-bar" title="登录">
     <van-icon slot="left" name="arrow-left" @click="$router.back()"/>
   </van-nav-bar>
   <!-- 导航栏 -->
  <!-- 登录表单 -->
  <van-form ref="loginForm" @submit="onSubmit">
    <van-field
      name="mobile"
      v-model="user.mobile"
      placeholder="请输入手机号"
      type="number"
      left-icon="smile-o"
      :rules="userFormRules.mobile"
      maxlength="11"
    >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
    <van-field
      name="code"
      v-model="user.code"
       type="number"
      placeholder="输入验证码"
      :rules="userFormRules.code"
      maxlength="6"
    >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
       <template #button>
         <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShow===true" @finish="isCountDownShow=false"/>
        <van-button size="small" round class="send-sms-btn" type="primary" native-type="button" @click="onSendSms" v-else>发送验证码</van-button>
       </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button class="login-btn-wrap" block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
  <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSMS } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单校验规则
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码错误'
        }]
      },
      isCountDownShow: false
    }
  },

  mounted () {

  },

  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data) // 将服务端返回数据中的token数据发送给vuex容器
        // 跳转回原来页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机或验证码错误')
        } else {
          this.$toast.fail('手机或验证码错误')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile') // validate校验表单内的元素，name
      } catch (err) {
        return console.log('验证失败')
      }
      // 验证通过，显示倒计时
      this.isCountDownShow = true
      try {
        // 发送验证码
        await sendSMS(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送得太频繁，请稍后再试')
        } else {
          this.isCountDownShow = false
          this.$toast('发送失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .login-container{
      .toutiao{
        font-size: 0.59333rem;
        }
        .send-sms-btn{
          background-color: #ECECEC;
          color: #8C8C8C;
          border: none;
          height: 50px;
          width: 152px;
          font-size: 22px;
        }
        .login-btn-wrap{
          background-color: #6DB4FB;
          border: none;
        }
    }
</style>
