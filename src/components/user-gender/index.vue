<template>
      <van-picker
          show-toolbar
          :columns="columns"
          @cancel="$emit('close')"
          @confirm="onConfirm"
          @change="onChange"
          :default-index="gender"
        />
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  name: 'userGender',

  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserInfo({
          gender: this.gender
        })
        this.$toast.success('修改成功')
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.gender)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style lang="less" scoped>

</style>
