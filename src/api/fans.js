import http from "@/utils/request";

export const reqGetFans = (page,per_page) => {
    return http({
        method:'get',
        url:'/followers',
        params:{
            page,
            per_page
        }
    })
}

/**
 * 获取粉丝列表统计数据
 */
export const reqGetFansStatistics = () => {
    return http({
      method: 'GET',
      url: '/statistics/followers'
    })
  }