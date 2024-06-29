import { RadioRepository } from "./repositories/RadioRepository";
import { FetcherInstance } from "./FetcherInstance";
import { AuthRepository } from "./repositories/AuthRepository";

export class MonkeyRadioAPI {
  private readonly fetcher: FetcherInstance;

  public readonly radio: RadioRepository;
  public readonly auth: AuthRepository;

  constructor(private readonly baseUrl: string) {
    this.fetcher = new FetcherInstance(this.baseUrl);

    this.radio = new RadioRepository(this.fetcher);
    this.auth = new AuthRepository(this.fetcher);
  }
}
