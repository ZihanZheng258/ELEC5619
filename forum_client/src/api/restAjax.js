import axios from "axios";
import { message } from "antd";

const config = {
    baseURL: "baseUrl",
    timeout: 100000,
    withCredentials: true,
};

class RequestHttp {
    constructor(config) {
        this.service = axios.create(config);
        this.service.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                return { ...config, headers: { "x-access-token": token } };
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.service.interceptors.response.use(
            (response) => {
                const { data, config } = response;
                
                if (data.code && data.code !== 200) {
                    message.error(data.msg);
                    return Promise.reject(data);
                }
                return data;
            },
            async (error) => {
                const { response } = error;
                if (response) {
                    switch (response.status) {
                        case 400:
                            message.error("Request failed! Please try again later");
                            break;
                        case 401:
                            message.error("Login invalid! Please login again");
                            break;
                        case 403:
                            message.error("The current account has no permission to access!");
                            break;
                        case 404:
                            message.error("The resource you visited does not exist!");
                            break;
                        case 405:
                            message.error("Wrong request mode! Please try again later!");
                            break;
                        case 408:
                            message.error("Request timeout! Please try again later!");
                            break;
                        case 500:
                            message.error("Service exception!");
                            break;
                        case 502:
                            message.error("Gateway error!");
                            break;
                        case 503:
                            message.error("Service unavailable!");
                            break;
                        case 504:
                            message.error("Gateway timeout!");
                            break;
                        default:
                            message.error("Request failed!");
                    }
                    if (!window.navigator.onLine) {
                        message.error("Request failed!");
                        console.log("error");
                    }
                    return Promise.reject(error);
                }
            }
        );
    }

    get(url, params = {}, _object = {}) {
        return this.service.get(url, { params, ..._object });
    }
    post(url, params = {}, _object = {}) {
        return this.service.post(url, params, _object);
    }
    put(url, params = {}, _object = {}) {
        return this.service.put(url, params, _object);
    }
    delete(url, params = {}, _object = {}) {
        return this.service.delete(url, { params, ..._object });
    }
}

export default new RequestHttp(config);
