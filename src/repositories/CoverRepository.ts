import { FetcherInstance } from "../FetcherInstance";
import type { CoverPostResponse } from "../responses/CoverResponses";

export class CoverRepository {
  constructor(protected readonly instance: FetcherInstance) {}

  protected get resource() {
    return `${this.instance.opts.baseUrl}/v4/cover`;
  }

  public async upload(file: File): Promise<CoverPostResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return this.instance.postMultipart<CoverPostResponse>(
      this.resource,
      formData,
    );
  }
}
