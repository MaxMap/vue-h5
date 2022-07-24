import axios from 'axios' // 使用前要先安装依赖：npm install axios
import { Notify } from "vant";
// 创建axios实例
const service = axios.create({
    // 这里可以放一下公用属性等。
    baseUrl: '', // 用于配置请求接口公用部分，请求时会自动拼接在你定义的url前面。
    withCredentials: false, // 跨域请求时是否需要访问凭证
    timeout: 3 * 1000, // 请求超时时间
    headers: {}
})

// 请求拦截器
service.interceptors.request.use(config => {
    // config.url = process.env.NODE_ENV !== 'production' ? '/api' + config.url : config.url
    config.url = process.env.NODE_ENV !== 'production' ? '/api' + config.url : 'http://114.215.26.124:8088' + config.url
    // 这里可以进行请求加密等操作。如添加token,cookie，修改数据传输格式等。
    const token = localStorage.getItem('token')
    config.headers['token'] = token || '';
    config.headers['Content-type'] = 'application/json';
    return config;
})

service.interceptors.response.use(response => {
    // 请求成功进行的操作。// 可以使用switch/if...else对数据先进行处理。
    const res = response.data
    if (!res) {
        Notify({
            type: "danger",
            message: '未知异常',
            duration: 1000,
        });
        throw new Error(`请求失败`)
    } else if (res.code !== 200) {
        Notify({
            type: "danger",
            message: res.msg,
            duration: 1000,
        });
        return Promise.reject(res.msg)
    } else {
        return res.data
    }
}, error => {
    // 请求失败进行的操作

    Notify({
        type: "danger",
        message: '未知异常',
        duration: 1000,
    });
    return error;
})

export default service;
