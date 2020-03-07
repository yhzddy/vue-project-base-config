/**
 * api 具体接口路径地址调用
 */

import request from './axios.js'

//获取百度
export function getBaidu(){
    request('get',"/api/books",{id:1})
}