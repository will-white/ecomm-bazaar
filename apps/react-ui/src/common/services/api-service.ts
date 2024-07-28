import AxiosClient from './axios-client';

const baseUrl = 'http://localhost:3000/';

class ApiService extends AxiosClient {
  constructor() {
    super(baseUrl);
  }

  async get(URL: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.get(URL)).data;
  }

  async post(URL: string, payload: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.post(URL, payload)).data;
  }

  async patch(URL: string, payload: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.patch(URL, payload)).data;
  }

  async delete(URL: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.delete(URL)).data;
  }
}

export default new ApiService();
