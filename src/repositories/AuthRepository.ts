import type { User } from "../models/User";
import { FetcherInstance } from "../FetcherInstance";
import type {
  LoginDataResponse,
  RenewTokenDataResponse,
} from "../responses/AuthResponses";

type LoginOpts =
  | {
      nickname: string;
      password: string;
    }
  | {
      token: string;
    };

export class AuthRepository {
  protected resource = "/v4/auth";
  protected instance: FetcherInstance;

  constructor(instance: FetcherInstance) {
    this.instance = instance;
  }

  public async login(opts: LoginOpts): Promise<LoginDataResponse | User> {
    if ("token" in opts) {
      this.instance.setToken(opts.token);
      return this.me();
    }
    if ("nickname" in opts && "password" in opts) {
      const { nickname, password } = opts;
      const user = await this.instance.post<LoginDataResponse>(
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
