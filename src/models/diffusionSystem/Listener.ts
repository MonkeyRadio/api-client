export enum ListenerState {
  INITIALIZING = "INITIALIZING",
  PLAYING = "PLAYING",
  IDLE = "IDLE",
  ENDED = "ENDED",
}

export type ListenerTimings = {
  start: number;
  breaks: {
    start: number;
    end?: number;
  }[];
  lastAction: number;
  totalListeningTime: number;
};

export type ListenerDetails = {
  webappUuid?: string;
};

export interface Listener {
  id: string;
  userAgent: string;
  listenersDetails: ListenerDetails;
  timings: ListenerTimings;
  state: ListenerState;
  manifestId: string;
}
