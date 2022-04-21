import request from '@/utils/request'

export const AllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 增加用户指定频道
export const SetUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户频道
export const DelUserChannel = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
