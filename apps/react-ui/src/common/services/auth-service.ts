import AxiosClient from './axios-client';

const baseUrl = 'http://localhost:3000/api/auth/';

class AuthService extends AxiosClient {
  constructor() {
    super(baseUrl);
  }

  async login(email: string, password: string, remember: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    const token = (
      await this.client.post<{ idToken: string }>('login', {
        email,
        password,
        remember,
      })
    ).data.idToken;

    return token;
  }

  async register(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.post('register', { email, password })).data;
  }

  refresh = () => this.client.get('refresh');
}

export default new AuthService();
