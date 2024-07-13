import type { FetcherInstance } from "../../FetcherInstance";
import type { StatsListenersResponse } from "../../responses/diffusionSystem/StatsListenersResponse";

export class StatsRepository {
  protected resource;

  constructor(protected readonly instance: FetcherInstance) {
    this.resource = `${this.instance.opts.diffusionUrl}/stats`;
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
