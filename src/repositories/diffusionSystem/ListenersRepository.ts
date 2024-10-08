import type { FetcherInstance } from "../../FetcherInstance";
import type { Listener } from "../../models/diffusionSystem/Listener";
import type { PaginatedResponse } from "../../types/PaginatedResponse";

export class ListenerRepository {
  constructor(protected readonly instance: FetcherInstance) {}

  protected get resource() {
    return `${this.instance.opts.diffusionUrl}/v1/listeners`;
  }

  public async list(opts?: {
    manifestId?: string;
    onlyPlaying?: boolean;
    page?: number;
    limit?: number;
  }) {
    const query = this.instance.newQueryMap();

    if (opts?.manifestId) query.set("manifestId", opts.manifestId);
    if (opts?.onlyPlaying) query.set("onlyPlaying", opts.onlyPlaying);
    if (opts?.page) query.set("page", opts.page);
    query.set("limit", opts?.limit || 30);

    return this.instance.get<PaginatedResponse<Listener>>(
      `${this.resource}?${this.instance.buildQueryString(query)}`,
    );
  }
}
