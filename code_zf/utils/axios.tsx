import axios from 'axios';
//在跨域 的时候传递cookie
axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: 'http://localhost:4000'
});
export default instance;