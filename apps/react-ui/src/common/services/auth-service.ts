import AxiosClient from './axios-client';
import usersService from './users-service';

const baseUrl = 'http://localhost:3000/api/auth/';

class AuthService extends AxiosClient {
  constructor() {
    super(baseUrl);
  }

  async login(email: string, password: string, remember: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    const data = (
      await this.client.post('login', { email, password, remember })
    ).data;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const me = await usersService.getMe();
    // console.log(me);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  }

  async register(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.post('register', { email, password })).data;
  }
}

export default new AuthService();
