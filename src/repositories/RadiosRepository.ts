import { BaseRepository } from "./BaseRepository";
import type { Radio } from "../models/Radio";
import { FetcherInstance } from "../FetcherInstance";

export class RadiosRepository extends BaseRepository<Radio> {
  protected resource;

  constructor(protected readonly instance: FetcherInstance) {
    super();
    this.resource = `${this.instance.opts.baseUrl}/v4/radio`;
  }

  public async fromDomain(domain: string): Promise<Radio> {
    const query = this.instance.newQueryMap();

    query.set("websiteDomain", domain);
    return this.instance.get<Radio>(
      `${this.resource}/findByDomain?${this.instance.buildQueryString(query)}`,
    );
  }
}
