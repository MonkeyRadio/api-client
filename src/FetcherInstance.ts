import { type FetchOptions, ofetch } from "ofetch";
import { jwtDecode } from "jwt-decode";
import type { EventController } from "./EventController";
import type { ConstructorOpts } from "./types/ConstructorOpts";

export class FetcherInstance {
  private token: string | null = null;
  constructor(
    public readonly opts: ConstructorOpts,
    public readonly events: EventController,
  ) {}

  private async ensureTokenValid() {
    if (!this.token) {
      throw new Error("No token provided");
    }
    const tokenDecoded = jwtDecode(this.token);
    if (tokenDecoded.exp && tokenDecoded.exp * 1000 < Date.now()) {
      const token = await ofetch<{ token: string }>(
        `${this.opts.baseUrl}/v4/auth/renewToken`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json",
          },
        },
      );
      this.token = token.token;
      this.events
        .getCallbacks("tokenRenewed")
        ?.forEach((cb) => cb(token.token));
    }
  }

  private async getBaseHeaders(): Promise<HeadersInit> {
    if (this.token) {
      await this.ensureTokenValid();
      return {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/json",
      };
    }
    return {
      Accept: "application/json",
    };
  }

  public setToken(token: string) {
    this.token = token;
  }

  public clearToken() {
    this.token = null;
  }

  public async get<T>(url: string, options?: FetchOptions<"json">) {
    return await ofetch<T>(url, {
      headers: {
        ...(await this.getBaseHeaders()),
      },
      ...options,
    });
  }

  public async post<T>(
    url: string,
    body: object,
    options?: FetchOptions<"json">,
  ) {
    return await ofetch<T>(url, {
      method: "POST",
      headers: {
        ...(await this.getBaseHeaders()),
        "Content-Type": "application/json",
      },
      body,
      ...options,
    });
  }

  public async put<T>(
    url: string,
    body: object,
    options?: FetchOptions<"json">,
  ) {
    return await ofetch<T>(url, {
      method: "PUT",
      headers: {
        ...(await this.getBaseHeaders()),
        "Content-Type": "application/json",
      },
      body,
      ...options,
    });
  }

  public async delete<T>(url: string, options?: FetchOptions<"json">) {
    return await ofetch<T>(url, {
      method: "DELETE",
      headers: {
        ...(await this.getBaseHeaders()),
      },
      ...options,
    });
  }

  public newQueryMap() {
    return new Map<string, string | number | boolean>();
  }

  public buildQueryString(query: Map<string, string | number | boolean>) {
    return Array.from(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
}
