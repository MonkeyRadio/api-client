import type { Event, EventCallback } from "./types/EventMap";

export class EventController {
  private events = new Map<keyof Event, EventCallback<keyof Event>[]>();
  public constructor() {}

  private get<T extends keyof Event>(event: T): EventCallback<T>[] | undefined {
    return this.events.get(event) as EventCallback<T>[] | undefined;
  }
  private has<T extends keyof Event>(event: T): boolean {
    return this.events.has(event);
  }
  private set<T extends keyof Event>(event: T, listeners: EventCallback<T>[]) {
    this.events.set(event, listeners);
  }

  public getCallbacks<T extends keyof Event>(
    event: T,
  ): readonly EventCallback<T>[] | undefined {
    return this.events.get(event) as EventCallback<T>[] | undefined;
  }

  public on<T extends keyof Event, K extends EventCallback<T>>(
    event: T,
    cb: K,
  ) {
    if (!this.has(event)) {
      this.set(event, []);
    }
    this.get(event)?.push(cb);
  }

  public off<T extends keyof Event, K extends EventCallback<T>>(
    event: T,
    cb: K,
  ) {
    if (!this.has(event)) {
      return;
    }
    const listeners = this.get(event);
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(cb);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }
}
