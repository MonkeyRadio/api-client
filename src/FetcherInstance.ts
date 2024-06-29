import { type CreateFetchOptions, ofetch } from "ofetch";

export class FetcherInstance {
  private readonly token: string | null = null;
  constructor(private readonly baseUrl: string) {}

  private getBaseHeaders(): HeadersInit {
    if (this.token)
      return {
        Authorization: this.token,
        Accept: "application/json",
      };
    return {
      Accept: "application/json",
    };
  }

  public async get<T>(url: string, options?: CreateFetchOptions) {
    return await ofetch<T>(`${this.baseUrl}${url}`, {
      headers: {
        ...this.getBaseHeaders(),
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
        ...this.getBaseHeaders(),
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
        ...this.getBaseHeaders(),
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
        ...this.getBaseHeaders(),
      },
      ...options,
    });
  }
}
