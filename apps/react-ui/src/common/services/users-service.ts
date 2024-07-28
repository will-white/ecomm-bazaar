import AxiosClient from './axios-client';

const baseUrl = 'http://localhost:3000/users/';

class UsersService extends AxiosClient {
  constructor() {
    super(baseUrl);
  }

  async get(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.get(id)).data;
  }

  async post(payload: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.post('', payload)).data;
  }

  async patch(id: string, payload: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.patch(id, payload)).data;
  }

  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.delete(id)).data;
  }

  async getMe(): Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.get('me')).data;
  }

  async patchMe() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.patch('me')).data;
  }
}

export default new UsersService();
