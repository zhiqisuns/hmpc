import axios from "axios";

// 在这里进行 axios 的配置
// 可以使用自定义配置新建一个 axios 实例, 可以写自己的配置项
const http = axios.create({
    baseURL: 'https://www.fastmock.site/mock/25a065fcbbb623d756d3dae3f2666a6d/api' // 基地址
    // timeout: 1000, // 请求等待延时时间
   
    // transformResponse: [function (data) {
    //   // 这里的data是字符串，在这个字符串的是没有丢失精度的，所以需要在这里先把精度调好
    //   console.log(data)
      
    //   // 后端返回数据可能不是 JSON 字符串，而JSONbig.parse()只能处理JSON字符串, try catch一下
    //   try {
    //     // 作用1：把json字符串转为js对象
    //     // 作用2：把里面的大数字做安全处理
    //     return JSONbig.parse(data)
    //   } catch (err) {
    //     return data
    //   }
    // }]
  })
  
  export default http