import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'

/*配置loading组件*/
const options = {
    lock: true,
    text: '数据加载中',
    spinner: 'el-icon-loading'
}
let loadingInstance = Loading.service(options);

/*创建并初始化axios实例*/
const instance = axios.create({
    baseURL: 'localhost:8080',
    timeout: 3000
})

instance.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

/**配置拦截器*/

instance.interceptors.request.use(config => {
    loadingInstance
    return config
}, err => {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    if (res.data.code === 200) {
        loadingInstance.close()
        return res
    } else {
        loadingInstance.close()
        Message.error('请求错误')
    }
}, err => {
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
})

/*
封装axios的get,post,delete,put方法
*/

function get(url, params) {
    // promise对象返回的是一个状态和数据
    // 参数需要在外面调用，所以需要return，而数据在回调函数中，使用promise中的reslove，reject对象将数据得出，return返回promise对象
    //如果成功返回一个成功的promise对象，失败返回一个失败的promise对象
    return new Promise((reslove, reject) => {
        instance.get(url, { params: params }).then(res => reslove(res.data)).catch(err => reject(err.data))
    })
}

function del(url, params) {
    return new Promise((reslove, reject) => {
        instance.delete(url, { params: params }).then(res => reslove(res.data)).catch(err => reject(err.data))
    })
}

function post(url, data) {
    return new Promise((reslove, reject) => {
        instance.post(url, qs.stringify(data)).then(res => reslove(res.data)).catch(err => reject(err.data))
    })
}

function put(url, data) {
    return new Promise((reslove, reject) => {
        instance.put(url, qs.stringify(data)).then(res => reslove(res.data)).catch(err => reject(err.data))
    })
}

/*暴露request函数*/

export default function request(method, url, content) {
    if (method === 'get') {
        get(url.content)
    }

    if (method === 'delete') {
        del(url, content)
    }

    if (method === 'post') {
        post(url, content)
    }

    if (method === 'put') {
        put(url, content)
    }
}