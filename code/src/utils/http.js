import axios from "axios"


export const http = axios.create(
    {
        baseURL: 'https://www.hao123.com'
    }
)


http.interceptors.request.use(req => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        req.headers.set('Authorization', `Bearer ${token}`);
    }
    return req;
});

http.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            alert('登录失效，请重新登录');
            //router.push('/login');
        }
        return Promise.reject(err);
    }
);

