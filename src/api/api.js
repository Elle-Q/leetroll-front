import axios from "axios";
import TokenService from "./token.service";

const request = axios.create();

const errorHandler = (data) => {
    switch (data && data.code) {
        case -1:
            alert(data.msg)
            break
        case 500:
            break
        case 200:
            break
        case 407:
        case 401:
            window.location = "/login";
            break
    }
}

request.interceptors.request.use(
    config => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config
    },
    error => {
        return Promise.reject(error);
    });

// Add a response interceptor
request.interceptors.response.use(
    resp=> {
        errorHandler(resp.data);
        return resp.data.data
    },
    error => {
        const originalConfig = error.response.config;
        if (error.response) {
            //Access token was expired
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    let param = new FormData();
                    param.append("refreshToken", TokenService.getLocalRefreshToken());
                    request.post('/leetroll-app/refreshToken', param).then(resp => {
                        TokenService.updateLocalToken(resp);
                        return request(originalConfig);
                    });

                } catch (_err) {
                    return Promise.reject(_err);
                }
            }
        }
        return Promise.reject(error);
    })


export default request;