import axios from 'axios' // 引入axios
import store from '../store/index'
import { Toast } from 'vant'
import qs from 'qs'

// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 重构封装GET请求
instance.REQUEST_GET = (url, params, headers)=>{
    return instance({
        method: 'get',
        url,
        params,
        headers
    })
}

instance.REQUEST_POST = (url, params, headers)=>{
    return instance({
        method: 'post',
        url, 
        data: qs.stringify(params),
        headers
    })
}


// 请求拦截器
instance.interceptors.request.use(    
    config => {        
        // 弹出loading等待框
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });

        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        if(store.state.tokenInfo){ 
            const tokenInfo = store.state.tokenInfo
            if(tokenInfo){
                // 将token信息添加到请求header中
                let tokenHeader = tokenInfo.tokenHeader
                let tokenValue = tokenInfo.tokenValue
                config.headers[tokenHeader] = tokenValue
            }     
        }
        return config;    
    },    
    error => {        
        Toast.clear()  // 请求发送失败，关闭loading框
        return Promise.error(error)   
})


// 响应拦截器
instance.interceptors.response.use(    
    response => {
        Toast.clear()  // 接收到响应，关闭loading框
           
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {            
        Toast.clear()  // 关闭loading框

        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:                    
                    Toast({
                        message: '执行该操作 请先登录',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面                
                case 403:
                    Toast({
                        message: '当前用户身份状态已过期，请重新登录',
                        duration: 1500,
                        forbidClick: true
                    });
                    break; 

                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast.fail('加载失败，请稍后重试');
            }
            return Promise.reject(error.response.status);
        }
    }    
);


export default instance;