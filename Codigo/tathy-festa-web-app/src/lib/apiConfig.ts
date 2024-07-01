import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
console.log('API Base URL:', axios.defaults.baseURL);


export default axios;
