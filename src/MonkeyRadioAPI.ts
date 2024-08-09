import { RadioRepository } from "./repositories/RadioRepository";
import { FetcherInstance } from "./FetcherInstance";
import { AuthRepository } from "./repositories/AuthRepository";
import { EventController } from "./EventController";
import type { ConstructorOpts } from "./types/ConstructorOpts";
import { ListenerRepository } from "./repositories/diffusionSystem/ListenersRepository";
import { StatsRepository } from "./repositories/diffusionSystem/StatsRepository";
import { HealthCheckRepository } from "./repositories/HealthCheckRepository";

export class MonkeyRadioAPI {
  private readonly fetcher: FetcherInstance;
  public readonly events: EventController;

  public readonly radio: RadioRepository;
  public readonly auth: AuthRepository;
  public readonly health: HealthCheckRepository;

  public readonly diffusionSystem: {
    listeners: ListenerRepository;
    stats: StatsRepository;
  };

  constructor(private readonly opts: ConstructorOpts) {
    this.events = new EventController();
    this.fetcher = new FetcherInstance(this.opts, this.events);

    this.radio = new RadioRepository(this.fetcher);
    this.auth = new AuthRepository(this.fetcher);
    this.health = new HealthCheckRepository(this.fetcher);

    this.diffusionSystem = {
      listeners: new ListenerRepository(this.fetcher),
      stats: new StatsRepository(this.fetcher),
    };
  }

  public changeOpts(opts: Partial<ConstructorOpts>) {
    this.fetcher.opts = {
      ...this.fetcher.opts,
      ...opts,
    };
  }
}
