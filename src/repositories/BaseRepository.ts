import type { FetcherInstance } from "../FetcherInstance";

export abstract class BaseRepository<T extends object> {
  protected readonly resource: string = "";
  protected readonly instance: FetcherInstance | undefined;

  protected async create(data: T) {
    return this.instance?.post<T>(this.resource, data);
  }

  protected async read(id: number) {
    return this.instance?.get<T>(`${this.resource}/${id}`);
  }

  protected async readAll() {
    return this.instance?.get<T[]>(this.resource);
  }

  protected async update(id: number, data: T) {
    return this.instance?.put<T>(`${this.resource}/${id}`, data);
  }

  protected async delete(id: number) {
    return this.instance?.delete<T>(`${this.resource}/${id}`);
  }
}
