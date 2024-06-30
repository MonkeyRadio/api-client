import type { User } from "../models/User";
import { FetcherInstance } from "../FetcherInstance";
import type {
  LoginDataResponse,
  LoginOpts,
  LoginTokenDataResponse,
  RenewTokenDataResponse,
} from "../responses/AuthResponses";

export class AuthRepository {
  protected resource = "/v4/auth";
  protected instance: FetcherInstance;

  constructor(instance: FetcherInstance) {
    this.instance = instance;
  }

  public async login<T extends LoginOpts>(
    opts: T,
  ): Promise<LoginDataResponse<T>> {
    if ("token" in opts && opts.token) {
      this.instance.setToken(opts.token);
      const user = await this.me();
      return user as LoginDataResponse<T>;
    }
    if ("nickname" in opts && "password" in opts) {
      const { nickname, password } = opts;
      const user = await this.instance.post<LoginTokenDataResponse>(
        `${this.resource}/login`,
        {
          nickname,
          password,
        },
      );
      this.instance.setToken(user.token);
      return user;
    }
    throw new Error("Invalid login options");
  }

  public async logout() {
    await this.instance.post(`${this.resource}/logout`, {});
    this.instance.clearToken();
  }

  public async me(): Promise<User> {
    return this.instance.get<User>(`${this.resource}/me`);
  }

  public async renewToken(): Promise<void> {
    const user = await this.instance.post<RenewTokenDataResponse>(
      `${this.resource}/renewToken`,
      {},
    );
    this.instance.setToken(user.token);
  }
}
