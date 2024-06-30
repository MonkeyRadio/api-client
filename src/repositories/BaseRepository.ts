import type { FetcherInstance } from "../FetcherInstance";

export abstract class BaseRepository<T extends object> {
  protected readonly resource: string = "";
  protected instance: FetcherInstance | undefined;

  public async create(data: T): Promise<T> {
    if (!this.instance) throw new Error("FetcherInstance is not defined");
    return this.instance.post<T>(this.resource, data);
  }

  public async read(id: string): Promise<T> {
    if (!this.instance) throw new Error("FetcherInstance is not defined");
    return this.instance.get<T>(`${this.resource}/${id}`);
  }

  public async readAll(): Promise<T[]> {
    if (!this.instance) throw new Error("FetcherInstance is not defined");
    return this.instance.get<T[]>(this.resource);
  }

  public async update(id: string, data: T): Promise<T> {
    if (!this.instance) throw new Error("FetcherInstance is not defined");
    return this.instance.put<T>(`${this.resource}/${id}`, data);
  }

  public async delete(id: string): Promise<T> {
    if (!this.instance) throw new Error("FetcherInstance is not defined");
    return this.instance.delete<T>(`${this.resource}/${id}`);
  }
}
