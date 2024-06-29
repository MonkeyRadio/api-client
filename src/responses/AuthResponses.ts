import type { User } from "../models/User";

export interface LoginDataResponse extends User {
  token: string;
}

export interface RenewTokenDataResponse {
  token: string;
}
