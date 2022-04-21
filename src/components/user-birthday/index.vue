<template>
  <div>
   <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'userBirthday',

  data () {
    return {
      minDate: new Date(1965, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },

  props: {
    value: {
      type: String,
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
        const userBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserInfo({
          birthday: userBirthday
        })
        this.$toast.success('修改成功')
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', userBirthday)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
