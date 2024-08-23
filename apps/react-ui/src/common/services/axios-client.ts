import axios, { AxiosError, AxiosInstance } from 'axios';

export default class AxiosClient {
  client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Access to config, request, and response
          if (error.response?.status === 401) {
            try {
              const refresh = await fetch(
                'http://localhost:3000/auth/' + 'refresh',
                {
                  credentials: 'include',
                }
              );
              console.log(refresh);
              if (!refresh.ok) {
                localStorage.removeItem('idToken');
                window.location.href = '/login';
              }
            } catch (error) {
              localStorage.removeItem('idToken');
              window.location.href = '/login';
            }
          }
        } else {
          console.error(error);
        }

        return Promise.reject(error);
      }
    );
  }
}
