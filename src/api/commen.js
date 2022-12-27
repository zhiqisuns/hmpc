import http from '@/utils/request';

export const reqGetComments = (page, per_page) => {
    return http({
      method: 'get',
      url: '/articles',
      params: {
        page,
        per_page,
        response_type: 'comment'
      }
    })
  }

  /**
 * 打开或者关闭文章评论
 * id: 文章编号
 * allow_comment: 是否关闭 (布尔值)
 */
export const reqModCommentStatus = (id, allow_comment) => {
  return http({
    method: 'put',
    url: '/comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment
    }
  })
}