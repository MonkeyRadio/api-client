import { RadioRepository } from "./repositories/RadioRepository";
import { FetcherInstance } from "./FetcherInstance";
import { AuthRepository } from "./repositories/AuthRepository";
import { EventController } from "./EventController";

export class MonkeyRadioAPI {
  private readonly fetcher: FetcherInstance;
  public readonly events: EventController;

  public readonly radio: RadioRepository;
  public readonly auth: AuthRepository;

  constructor(private readonly baseUrl: string) {
    this.events = new EventController();
    this.fetcher = new FetcherInstance(this.baseUrl, this.events);

    this.radio = new RadioRepository(this.fetcher);
    this.auth = new AuthRepository(this.fetcher);
  }
}
