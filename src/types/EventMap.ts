import type { User } from "../models/User";

type EmptyObject = Record<string, never>;

export type Event = {
  tokenRenewed: {
    params: {
      token: string;
    };
    callback: (token: string) => void;
  };
  loggedIn: {
    params: {
      user: User;
      token: string;
    };
    callback: (user: User, token: string) => void;
  };
  loggedOut: {
    params: EmptyObject;
    callback: () => void;
  };
};

export type EventCallback<T extends keyof Event> = Event[T]["callback"];
