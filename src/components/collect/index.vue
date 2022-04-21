<template>
  <van-icon
        :color="value? 'yellow':''"
        :name="value? 'star':'star-o'"
        :loading="loading"
        @click="collect"
      />
</template>

<script>
import { addCollect, delCollect } from '@/api/collect'
export default {
  name: 'collectArticle',

  data () {
    return {
      loading: false
    }
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      type: [String, Number, Object],
      required: true
    }
  },

  methods: {
    async collect () {
      this.loading = true
      try {
        if (this.value) {
          // 取消收藏
          await delCollect(this.id)
        } else {
          // 收藏
          const { data: res } = await addCollect(this.id)
          console.log(res)
        }
        this.$toast(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.$emit('input', !this.value)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
