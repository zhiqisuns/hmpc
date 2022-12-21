import http from '@/utils/request'

export const reqGetArticles = (queryObj) => {
  return http({
    method: 'get',
    url: '/articles',
    params: queryObj || {}
  })
}

export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/channels',
  })
}

// export const reqDeleteArticle = (articleId) => {
//   return http({
//     method: 'delete',
//     url: `/articles/${articleId}`
//   })
// }