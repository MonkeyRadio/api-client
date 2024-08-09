import type { User } from "../models/User";
import { FetcherInstance } from "../FetcherInstance";
import type {
  LoginDataResponse,
  LoginOpts,
  LoginTokenDataResponse,
  RenewTokenDataResponse,
} from "../responses/AuthResponses";

export class AuthRepository {
  constructor(protected readonly instance: FetcherInstance) {}

  protected get resource() {
    return `${this.instance.opts.baseUrl}/v4/auth`;
  }

  public async login<T extends LoginOpts>(
    opts: T,
  ): Promise<LoginDataResponse<T>> {
    if ("token" in opts && opts.token) {
      this.instance.setToken(opts.token);
      const user = await this.me();
      this.instance.events.getCallbacks("loggedIn")?.forEach((cb) => cb(user));
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
      this.instance.events
        .getCallbacks("loggedIn")
        ?.forEach((cb) => cb(user, user.token));
      return user;
    }
    throw new Error("Invalid login options");
  }

  public async logout() {
    await this.instance.post(`${this.resource}/logout`, {});
    this.instance.clearToken();
    this.instance.events.getCallbacks("loggedOut")?.forEach((cb) => cb());
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
