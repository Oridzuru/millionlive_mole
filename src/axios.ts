import Axios from 'axios';
import axiosRetry from 'axios-retry';
import store from './store';

const BASE_URL: string = 'https://api.matsurihi.me/mltd/v1/';

const instance = Axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});
axiosRetry(instance, {
    retries: 5,
    // retryDelay type:function default:0
    // retryDelay: ()=>3000 
});
//请求拦截器
instance.interceptors.request.use((config) => {
    store.dispatch('setloadding', true); 
    return config
})
//响应拦截器
instance.interceptors.response.use((config) => {
    store.dispatch('setloadding', false);
    return config
})

export default instance;
