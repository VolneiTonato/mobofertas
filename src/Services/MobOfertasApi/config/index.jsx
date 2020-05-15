import axios from 'axios'


const CancelToken = axios.CancelToken
let cancel


export const Api = axios.create({ baseURL: process.env.REACT_APP_API_URL })



Api.interceptors.request.use(async config => {

    if(cancel)
        cancel()

    config.cancelToken = new CancelToken( (c) => cancel = c)
    
    return config
    /*
    const token = await GetToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;*/
}, (err) => {
    return Promise.reject(err)
})

Api.interceptors.response.use(async response => {
    return response
}, (err) => {
    
    if(axios.isCancel(err))
        return Promise.reject(new axios.Cancel())
    
    if(err?.response?.data?.message)
        return Promise.reject(err?.response?.data?.message)
    else
        return Promise.reject(err.toString())

})