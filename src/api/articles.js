import http from '@/utils/request'

// 获取文章列表
export const reqGetArticles = (queryObj) => {
  return http({
    method: 'get',
    url: '/articles',
    params: queryObj || {}
  })
}

// 获取文章频道
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/channels',
  })
}

/**
 * 添加文章
 * @param {*} isDraft 是否草稿
 * @param {*} article  
 * @returns 
 */
export const reqAddArticle = (isDraft,article) => {
  return http({
    method: 'post',
    url: '/artilces',
    params:{
      draft:isDraft
    },
    data:article
  })
}

/**
 * 根据 id 获取文章详情
 */
export const reqGetArticleById = (id) => {
  return http({
    method: 'get',
    url: `/artilces/${id}`
  })
}

/**
 * 根据 id 保存修改文章详情
 */
export const reqEditArticle = (id, draft, data) => {
  return http({
    method: 'put',
    url: `/articles/${id}`,
    data,
    params: {
      draft
    }
  })
}



// export const reqDeleteArticle = (articleId) => {
//   return http({
//     method: 'delete',
//     url: `/articles/${articleId}`
//   })
// }