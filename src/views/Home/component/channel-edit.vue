<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <span slot="title" class="title">我的频道</span>
      <van-button color="#7232dd" size="mini" round plain class="btn" @click="isEidt=!isEidt">{{isEidt ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="16" class="gird-select">
      <van-grid-item class="grid-select-item"
      v-for="(item,index) in mychannels"
      :key="item.id"
      @click="delChannels(item.id , index)"
      >
      <van-icon
      slot="icon"
      name="clear"
      v-show="isEidt && ! cannotDel.includes(item.id)"
      ></van-icon>
      <span slot="text"
       class="text"
       :class="{active : active===index}"
       >{{item.name}}</span>
      </van-grid-item>
    </van-grid>
     <van-cell :border="false">
      <span slot="title" class="title">频道推荐</span>
    </van-cell>
    <van-grid :gutter="16" class="gird-commend">
      <van-grid-item class="grid-item" icon="plus" v-for="(item,index) in recommendChannels" :key="index" :text="item.name" @click="addChannel(item)" />
    </van-grid>
  </div>
</template>

<script>
import { AllChannels, SetUserChannel, DelUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',

  props: {
    mychannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      requied: true
    }
  },

  data () {
    return {
      allchannel: [],
      mychannels: this.mychannel,
      isEidt: false,
      cannotDel: [0]
    }
  },

  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // const channels = []
      // this.allchannel.forEach(channel => {
      //   const my = this.mychannel.find(mych => channel.id === mych.id)
      //   if (!my) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
      // 根据条件生成新数组
      return this.allchannel.filter(channel => {
        // 将我的列表中已经有的数据剔除
        return !this.mychannel.find(my => {
          return my.id === channel.id
        })
      })
    }
  },

  methods: {
    async getAllChannels () {
      try {
        const { data: res } = await AllChannels()
        this.allchannel = res.data.channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    async addChannel (channel) {
      try {
        this.mychannels.push(channel)
        if (this.user) {
          await SetUserChannel({
            id: channel.id,
            seq: this.mychannels.length
          })
        } else {
          setItem('channels', this.mychannels)
        }
      } catch (err) {
        this.$toast('网络错误')
      }
    },
    delChannels (id, index) {
      if (this.isEidt) {
        // 避免删除不可删除的列表
        if (this.cannotDel.includes(id)) {
          return
        }
        this.mychannels.splice(index, 1)
        // 当执行删除操作时，位置还需保持在原来的频道，所以，把this.active - 1，因为数组中少了一项列表
        if (index <= this.active) {
          this.$emit('active-change', this.active - 1, true)
        }
      } else {
        this.$emit('active-change', index)
      }
      // 同步至服务器和本地存储
      if (this.user) {
        this.delPannel(id)
      } else {
        setItem('channels', this.mychannels)
      }
    },
    async delPannel (id) {
      try {
        await DelUserChannel(id)
      } catch (err) {
        this.$toast('网络错误')
      }
    }
  },

  created () {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
  .channel-edit{
   /deep/ .van-grid-item__icon-wrapper{
     position: unset;
   }
    padding: 109px 0;
    .title{
      font-size: 32px;
      color: #333;
    }
    .btn{
      width: 120px;
      height: 50px;
    }
    .grid-item{
      width: 160px;
      height: 86px;
      font-size: 28px;
      color: #222;
     /deep/ .van-grid-item__content--center{
        background-color: #f4f5f6;
      }
    }
   /deep/ .van-grid-item__text ,.text{
      white-space: nowrap;
    }
    .gird-select{
      .grid-select-item{
          width: 160px;
          height: 86px;
          font-size: 28px;
          color: #222;
          /deep/ .van-grid-item__content--center{
          background-color: #f4f5f6;
      }
         /deep/ .van-icon-clear{
            font-size: 30px;
            position: absolute;
            top: -7px;
            right: -9px;
            color: red;
            z-index: 2;
          }
         /deep/ .van-grid-item__text{
          margin-top: 0;
        }
      }
    }
    .gird-commend{
      /deep/ .van-grid-item__content{
        flex-direction:unset;
        .van-icon-plus{
          margin-right: 6px;
          font-size: 24px;
        }
        .van-grid-item__text{
          margin-top: 0;
        }
      }
    }
    .active{
      color: red;
    }
  }
</style>
