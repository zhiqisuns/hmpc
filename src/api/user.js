import http from '@/utils/request'
import { getUser } from '@/utils/storage'

export const reqUserLogin = (mobile,code)=>{
    return http({
        method:'GET',
        url:'/authorizations',
        data:{
            mobile,
            code
        }
    })
}
export const reqGetUserProfile = () => {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return http({
      method: 'get',
      url: '/user/profile'
      // headers: {
      //   // Authorization: `Bearer ${userInfo.token}`
      // }
    })
}

export const reqGetUserInfo = () => {
  const userInfo = getUser()
  return http({
    method: 'get',
    url: '/user/profile',
    // 配置请求头, 在请求头中, 需要传递token参数(令牌) => 用于身份认证
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  })
}
/**
 * 修改用户信息
 * @param {*} data { name, intro, email }
 */
export const reqModUserProfile = data => {
  return http({
    method: 'patch',
    url: '/user/profile',
    data
  })
}

/**
 * 修改头像
 * @param {*} formData 是一个formData格式的对象
 * formData.append('photo', file)
 */
export const reqModUserImage = formData => {
  return http({
    method: 'patch',
    url: '/user/photo',
    data: formData
  })
}