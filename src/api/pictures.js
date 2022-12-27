import http from '@/utils/request'

export const reqGetImages = (queryObj) => {
  return http({
    method: 'get',
    url: '/pictures',
    params: queryObj || {}
  })
}
// export const reqSwitchCollect = (id, collect) => {
//     return http({
//       method: 'put',
//       url: `/pictures/${id}`,
//       data: {
//         collect
//       }
//     })
//   }

/**
 * 删除图片素材
 */
// export const reqDeleteImages = (id) => {
//     http({
//       method: 'delete',
//       url: `/mp/v1_0/user/images/${id}`
//     })
//   }