import type { FetcherInstance } from "../../FetcherInstance";
import type { StatsListenersResponse } from "../../responses/diffusionSystem/StatsListenersResponse";

export class StatsRepository {
  constructor(protected readonly instance: FetcherInstance) {}

  protected get resource() {
    return `${this.instance.opts.diffusionUrl}/v1/stats`;
  }

  public async listeners(
    radioId: string,
    opts?: {
      manifestId?: string;
      onlyLive?: boolean;
    },
  ) {
    const query = this.instance.newQueryMap();
    if (opts?.manifestId) query.set("manifestId", opts.manifestId);
    if (opts?.onlyLive) query.set("onlyLive", opts.onlyLive);
    return this.instance.get<StatsListenersResponse>(
      `${this.resource}/${radioId}/listeners?${this.instance.buildQueryString(query)}`,
    );
  }
}
