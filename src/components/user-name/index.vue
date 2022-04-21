<template>
  <div class="username">
      <van-nav-bar
        title="昵称"
        left-text="返回"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="updateInfo"
      />
      <div class="inputtext">
        <van-field
          v-model.trim="name"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  name: 'userName',

  data () {
    return {
      name: this.value
    }
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    async updateInfo () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.name.length) {
          this.$toast('用户名不能为空')
          return
        }
        await updateUserInfo({
          name: this.name
        })
        this.$toast.success('修改成功')
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.name)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .username{
    .inputtext{
      padding: 20px;
    }
  }
</style>
