import { RadiosRepository } from "./repositories/RadiosRepository";
import { FetcherInstance } from "./FetcherInstance";
import { AuthRepository } from "./repositories/AuthRepository";
import { EventController } from "./EventController";
import type { ConstructorOpts } from "./types/ConstructorOpts";
import { ListenerRepository } from "./repositories/diffusionSystem/ListenersRepository";
import { StatsRepository } from "./repositories/diffusionSystem/StatsRepository";

export class MonkeyRadioAPI {
  private readonly fetcher: FetcherInstance;
  public readonly events: EventController;

  public readonly radios: RadiosRepository;
  public readonly auth: AuthRepository;

  public readonly diffusionSystem: {
    listeners: ListenerRepository;
    stats: StatsRepository;
  };

  constructor(private readonly opts: ConstructorOpts) {
    this.events = new EventController();
    this.fetcher = new FetcherInstance(this.opts, this.events);

    this.radios = new RadiosRepository(this.fetcher);
    this.auth = new AuthRepository(this.fetcher);

    this.diffusionSystem = {
      listeners: new ListenerRepository(this.fetcher),
      stats: new StatsRepository(this.fetcher),
    };
  }
}
