import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

const service = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Access-Control-Allow-Origin-Type': '*'
    },
    baseURL: '', // api base_url
    timeout: 60000000 // 请求超时时间
})

service.interceptors.request.use(async (config : any) => {
// 转换成form-data类型
    if(!config.contentType || config.contentType.indexOf('x-www-form-urlencoded') !== -1) {
        config.transformRequest =  [function(data: any) {
            return qs.stringify(data)
        }]
    }
    config.headers['Content-Type'] = config.contentType ? config.contentType : 'application/x-www-form-urlencoded;charset=UTF-8' // 让每个请求携带自定义form-data转换
    return config
}, function(err) {
    message.error(err)
})

service.interceptors.response.use(response => {
    return response.data
}, function(err) {
    message.error(err)
})

export default service
