import request from '@/utils/request'

// 获取评论列表
export const commentList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 给评论点赞
export const like = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消给评论点赞
export const donlike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 对文章或评论进行评论
export const Comment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
