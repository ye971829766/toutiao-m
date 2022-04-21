<template>
  <div class="search-contianer">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <Result v-if="isResultShow" :searhtext="searchText"></Result>
    <!-- 联想词 -->
    <Lenovo v-else-if="searchText" :searchTxt="searchText" @sendTxt="onSearch"></Lenovo>
    <!-- 搜索历史 -->
    <History v-else :searchhistories="searchHistories" @delHistory="Delhistory" @clearHistory="searchHistories=[]" @Search="onSearch"></History>
  </div>
</template>

<script>
import History from '@/views/search/component/Search-history.vue'
import Lenovo from '@/views/search/component/Search-lenovo.vue'
import Result from '@/views/search/component/Search-result.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  components: {
    History,
    Lenovo,
    Result
  },
  name: 'SearchIndex',

  data () {
    return {
      isResultShow: false,
      searchText: '',
      searchHistories: getItem('HISTORY') || []
    }
  },

  watch: {
    searchHistories (value) {
      setItem('HISTORY', value)
    }
  },

  methods: {
    onSearch (value) {
      this.searchText = value
      this.isResultShow = true
      const index = this.searchHistories.indexOf(value)
      // 排除重复的历史记录
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(value)
    },
    onCancel () {
      this.$router.back()
      console.log('oncancel')
    },
    Delhistory (index) {
      this.searchHistories.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-contianer{
    padding-top: 108px;
    .van-search__action{
      color: white;
    }
     /deep/ .van-search{
       position: fixed;
       top: 0;
       right: 0;
       left: 0;
       z-index: 1;
     }
  }
</style>
