import { FetcherInstance } from "../FetcherInstance";
import type { HealthCheckResponse } from "../responses/HealthCheckResponse";

export class HealthCheckRepository {
  constructor(protected readonly instance: FetcherInstance) {}

  protected get resource() {
    return `${this.instance.opts.baseUrl}/v4/health-check`;
  }

  public async checkHealth(): Promise<HealthCheckResponse> {
    return this.instance.get<HealthCheckResponse>(this.resource);
  }
}
