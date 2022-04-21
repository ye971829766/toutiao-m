<template>
  <div class="userImg">
    <img :src="img" class="img" ref="img">
    <div class="btn">
    <van-button type="danger"  round size="small" class="btn-cancel" @click="$emit('close')">取消</van-button>
    <van-button type="primary" round size="small" class="btn-confirm" @click="onConfirm">确定</van-button>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UserPhoto',

  data () {
    return {
      cropper: null
    }
  },

  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },

  methods: {
    onConfirm () {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.upDatePhoto(blob)
      })
    },
    async upDatePhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('updatephoto', data.data.photo)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },

  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop (event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .userImg{
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    .img{
      display: block;
      max-width: 100%;
    }
    .btn{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
</style>
