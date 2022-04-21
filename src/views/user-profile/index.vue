<template>
  <div class="userprofile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
    type="file"
    ref="file"
    hidden
    @change="onFileChange"
    >
    <van-cell title="头像" is-link
    @click="$refs.file.click()"
    >
      <van-image
       class="avatar"
       round
       fit="cover"
       :src="user.photo"
      />
    </van-cell>
    <van-cell title="性别" @click="userGenderShow=true" :value="user.gender===0? '男':'女'" is-link></van-cell>
    <van-cell title="生日" @click="userBirthdayShow=true" :value="user.birthday" is-link></van-cell>
    <van-cell title="昵称" @click="userNameShow=true" :value="user.name" is-link></van-cell>

    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="userNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <UserName
    @close="userNameShow=false"
    v-model="user.name"
    v-if="userNameShow"
    ></UserName>
    </van-popup>
    <!-- /编辑昵称弹层 -->

    <!-- 修改性别 -->
    <van-popup v-model="userGenderShow" round position="bottom">
      <UserGender
      v-if="userGenderShow"
      @close="userGenderShow=false"
      v-model="user.gender"
      ></UserGender>
      </van-popup>
    <!-- /修改性别 -->
    <!-- 修改生日 -->
      <van-popup v-model="userBirthdayShow" round position="bottom">
      <UserBirthday
      v-if="userBirthdayShow"
      @close="userBirthdayShow=false"
      v-model="user.birthday"
      ></UserBirthday>
      </van-popup>
      <!-- /修改生日 -->

      <!-- 用户头像 -->
       <van-popup v-model="userPhotoShow"  position="bottom" :style="{ height: '100%' }">
      <UserPhoto
      v-if="userPhotoShow"
      @close="userPhotoShow=false"
      v-model="user.photo"
      :img="img"
      @updatephoto="user.photo=$event"
      ></UserPhoto>
      </van-popup>
      <!-- /用户头像 -->
  </div>
</template>

<script>
import { UserInfo } from '@/api/user'
import UserName from '@/components/user-name'
import UserGender from '@/components/user-gender'
import UserBirthday from '@/components/user-birthday'
import UserPhoto from '@/components//user-photo'
export default {
  name: 'userProfile',

  components: {
    UserName,
    UserGender,
    UserBirthday,
    UserPhoto
  },

  data () {
    return {
      user: {},
      userNameShow: false,
      userGenderShow: false,
      userBirthdayShow: false,
      userPhotoShow: false,
      img: null
    }
  },

  created () {
    this.loadUserInfo()
  },

  methods: {
    async loadUserInfo () {
      try {
        const { data: res } = await UserInfo()
        this.user = res.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据 ：设置图片src
      const data = window.URL.createObjectURL(file)
      this.img = data
      this.userPhotoShow = true
      // 如果选择了同一张图片，不会触发input的change事件
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .userprofile{
    .avatar{
      width: 60px;
      height: 60px;
    }
    .van-popup{
      background-color: #f5f7f9;
    }
  }
</style>
