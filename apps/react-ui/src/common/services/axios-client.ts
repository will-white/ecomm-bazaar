import axios, { AxiosError, AxiosInstance } from 'axios';

export default class AxiosClient {
  client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({ baseURL: baseUrl, withCredentials: true });

    this.client.interceptors.request.use(
      (config) => {
        const token = 'token';
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        //const url = response.config.url;

        //setLocalStorageToken(token);
        return response;
      },
      (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Access to config, request, and response
          if (error.response?.status === 401) {
            //(`unauthorized :)`);
            //localStorage.removeItem("persist:root");
            //removeLocalStorageToken
            //window.location.href = "/login";
          }
        } else {
          console.error(error);
        }

        return Promise.reject(error);
      }
    );
  }
}
