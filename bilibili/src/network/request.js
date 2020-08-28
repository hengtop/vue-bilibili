import axios from 'axios'
import router from 'router'
import Vue from 'vue'
  //1.创建实例
const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api',
    timeout: 5000,//超时设置
  });

  //请求拦截器设置
  http.interceptors.request.use((config) => {
    console.log(config);
    if(localStorage.getItem('token')&&localStorage.getItem('id')){
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  });
  //响应拦截
  http.interceptors.response.use((response) => {
    return response;
  },(error) => {
      if (error.response.status === 401 || error.response.status === 402){//没有token就跳转到登录页面
      router.push('/login');//跳转
      Vue.prototype.$msg.fail(error.response.data.message);//跳转提示
    }

    return Promise.reject(error);
  })
export default http

