<template>
    <van-button
            v-if="isFollowed"
            class="follow-btn"
            round
            size="small"
            :loading="loading"
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
            :loading="loading"
            @click="follow"
          >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowuserModule',

  model: {
    prop: 'isFollowed',
    event: 'isFollowedStatus'
  },

  props: {
    userID: {
      type: [String, Number, Object],
      required: true
    },
    isFollowed: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      loading: false
    }
  },

  mounted () {

  },

  methods: {
    async follow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已经关注，点击取消关注
          await deleteFollow(this.userID)
        } else {
          // 关注用户
          await addFollow(this.userID)
        }
        // 按钮的视图状态
        this.$emit('isFollowedStatus', !this.isFollowed)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('你不能关注你自己')
        }
        console.log(err)
        this.$toast('请检查网络')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
