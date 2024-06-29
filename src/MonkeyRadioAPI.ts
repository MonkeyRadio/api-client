import { RadioRepository } from "./repositories/RadioRepository";
import { FetcherInstance } from "./FetcherInstance";

export class MonkeyRadioAPI {
  private readonly fetcher: FetcherInstance;

  public readonly radio: RadioRepository;

  constructor(private readonly baseUrl: string) {
    this.fetcher = new FetcherInstance(this.baseUrl);
    this.radio = new RadioRepository(this.fetcher);
  }
}
