import { getFromLocalStorage } from '@/helpers';
import { baseUrl as baseURL, tokenKey } from '@/utils';
import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
    baseURL,
});

const onRequest = async (
    config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
    const token = getFromLocalStorage(tokenKey);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // showToast(error.message || "An error occurred", "error");

    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // const alertDivElement = <HTMLDivElement>document.querySelector('.alert-form');
    // if (response.data.message === 'Expired token') {
    // 	if (alertDivElement) {
    // 		alertDivElement.classList.remove('hidden');
    // 	}
    // }

    return response;
};

const onResponseError = (error: AxiosError) => {
    const statusCode = error.response?.status;

    const token = getFromLocalStorage(tokenKey);
    const user = token ? jwtDecode(token) : null;

    const isLoggedIn = user ? true : false;

    if (isLoggedIn) {
        return null;
    } else {
        window.location.href = '/auth/login';
    }
    if (statusCode === 401) {
        window.location.href = '/auth/login';
    }

    return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
