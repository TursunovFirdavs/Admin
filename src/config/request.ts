import axios, { AxiosInstance } from "axios";
import Cookies from 'js-cookie'

const request: AxiosInstance = axios.create({
    baseURL: 'http://135.181.108.207',
    headers: {
        "Content-Type": "application/json",
    }
});

request.interceptors.request.use((setconfig: any) => {
    if (setconfig.url !== "/api/admin-login/")
        setconfig.headers["Authorization"] = `Token ${Cookies.get("token")}`;
    return setconfig;
}, (error) => {
    return Promise.reject(error);
}
);


export { request };