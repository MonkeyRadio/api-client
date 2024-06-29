import { BaseRepository } from "./BaseRepository";
import type { Radio } from "../models/Radio";
import { FetcherInstance } from "../FetcherInstance";

export class RadioRepository extends BaseRepository<Radio> {
  protected resource = "/v4/radio";
  protected instance: FetcherInstance;

  constructor(instance: FetcherInstance) {
    super();
    this.instance = instance;
  }
}
