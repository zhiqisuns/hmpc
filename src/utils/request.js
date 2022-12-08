import axios from "axios";

// 在这里进行 axios 的配置
// 可以使用自定义配置新建一个 axios 实例, 可以写自己的配置项
const http = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn' // 基地址
    // timeout: 1000, // 请求等待延时时间
    // headers: { 'X-Custom-Header': 'foobar' } // 请求头
  })
  
  export default http