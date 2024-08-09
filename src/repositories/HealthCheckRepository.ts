import { FetcherInstance } from "../FetcherInstance";
import type { HealthCheckResponse } from "../responses/HealthCheckResponse";

export class HealthCheckRepository {
  protected resource;

  constructor(protected readonly instance: FetcherInstance) {
    this.resource = `${this.instance.opts.baseUrl}/v4/health-check`;
  }

  public async checkHealth(): Promise<HealthCheckResponse> {
    return this.instance.get<HealthCheckResponse>(this.resource);
  }
}
