<template>
  <div class="search-history">
   <van-cell-group>
      <van-cell title="搜索历史">
         <template #right-icon>
           <van-button type="danger" size="mini" @click="clear">全部删除</van-button>
          </template>
      </van-cell>
    </van-cell-group>
     <van-cell-group>
      <van-cell center :title="item" v-for="(item,index) in searchhistories" :key="index" @click="$emit('Search' , item)">
          <template #right-icon>
            <van-icon name="close" @click.stop="del(index)"/>
          </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MSearchHistory',

  props: {
    searchhistories: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
    }
  },

  mounted () {

  },

  methods: {
    clear () {
      this.$dialog.confirm({
        message: '确定清空历史记录吗？'
      })
        .then(() => {
          this.$emit('clearHistory')
        })
        .catch(() => {
          // on cancel
        })
    },
    del (index) {
      this.$emit('delHistory', index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
