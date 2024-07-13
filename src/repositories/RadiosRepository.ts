import { BaseRepository } from "./BaseRepository";
import type { Radio } from "../models/Radio";
import { FetcherInstance } from "../FetcherInstance";

export class RadiosRepository extends BaseRepository<Radio> {
  protected resource;

  constructor(protected readonly instance: FetcherInstance) {
    super();
    this.resource = `${this.instance.opts.baseUrl}/v4/radio`;
  }
}
