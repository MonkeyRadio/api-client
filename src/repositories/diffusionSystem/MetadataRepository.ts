import type { FetcherInstance } from "../../FetcherInstance";
import type { Metadata } from "../../models/diffusionSystem/Metadata";

export class MetadataRepository {
  constructor(protected readonly instance: FetcherInstance) { }

  protected get resource() {
    return `${this.instance.opts.diffusionUrl}/v1/metadata`;
  }

  public async getCurrent(radioId: string, contentId: string) {
    const query = this.instance
      .newQueryMap()
      .set("contentId", contentId)
      .set("radioId", radioId);
    return this.instance.get<Metadata>(
      `${this.resource}/current?${this.instance.buildQueryString(query)}`,
    );
  }
}
