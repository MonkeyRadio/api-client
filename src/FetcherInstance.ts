import { type CreateFetchOptions, ofetch } from "ofetch";
import { jwtDecode } from "jwt-decode";
import { AuthRepository } from "./repositories/AuthRepository";

export class FetcherInstance {
  private token: string | null = null;
  constructor(private readonly baseUrl: string) {}

  private async ensureTokenValid() {
    if (!this.token) {
      throw new Error("No token provided");
    }
    const tokenDecoded = jwtDecode(this.token);
    if (tokenDecoded.exp && tokenDecoded.exp * 1000 < Date.now()) {
      const authRepository = new AuthRepository(this);
      await authRepository.renewToken();
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

  public async get<T>(url: string, options?: CreateFetchOptions) {
    return await ofetch<T>(`${this.baseUrl}${url}`, {
      headers: {
        ...(await this.getBaseHeaders()),
      },
      ...options,
    });
  }

  public async post<T>(
    url: string,
    body: object,
    options?: CreateFetchOptions,
  ) {
    return await ofetch<T>(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        ...(await this.getBaseHeaders()),
        "Content-Type": "application/json",
      },
      body,
      ...options,
    });
  }

  public async put<T>(url: string, body: object, options?: CreateFetchOptions) {
    return await ofetch<T>(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        ...(await this.getBaseHeaders()),
        "Content-Type": "application/json",
      },
      body,
      ...options,
    });
  }

  public async delete<T>(url: string, options?: CreateFetchOptions) {
    return await ofetch<T>(`${this.baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        ...(await this.getBaseHeaders()),
      },
      ...options,
    });
  }
}
