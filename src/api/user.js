import http from '@/utils/request'

export const reqUserLogin = (mobile,code)=>{
    return http({
        method:'GET',
        url:'/server',
        data:{
            mobile,
            code
        }
    })
}
export const reqGetUserProfile = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return http({
      method: 'get',
      url: '/mp/v1_0/user/profile',
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
}
