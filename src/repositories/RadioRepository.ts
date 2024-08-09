import { BaseRepository } from "./BaseRepository";
import type { Radio } from "../models/Radio";
import { FetcherInstance } from "../FetcherInstance";

export class RadioRepository extends BaseRepository<Radio> {
  constructor(protected readonly instance: FetcherInstance) {
    super();
  }

  protected get resource() {
    return `${this.instance.opts.baseUrl}/v4/radio`;
  }

  public async fromDomain(domain: string): Promise<Radio> {
    const query = this.instance.newQueryMap();

    query.set("websiteDomain", domain);
    return this.instance.get<Radio>(
      `${this.resource}/findByDomain?${this.instance.buildQueryString(query)}`,
    );
  }
}
