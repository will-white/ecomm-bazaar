import AxiosClient from './axios-client';

const baseUrl = 'http://localhost:3000/profiles/personal-info';

class PersonalInfoService extends AxiosClient {
  constructor() {
    super(baseUrl);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getMe(): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.get('')).data;
  }

  async patchMe() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.client.patch('')).data;
  }
}

export default new PersonalInfoService();
