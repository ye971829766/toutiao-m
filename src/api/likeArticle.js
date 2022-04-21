import request from '@/utils/request'

// 点赞文章
export const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const dellikeArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
