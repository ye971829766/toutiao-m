import request from '@/utils/request'

export const searchSuggests = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const searchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
