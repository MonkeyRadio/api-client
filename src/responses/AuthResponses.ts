import type { User } from "../models/User";

type LoginBasicOpts = {
  nickname: string;
  password: string;
};

type LoginTokenOpts = {
  token: string;
};

export type LoginOpts = LoginBasicOpts | LoginTokenOpts;

export type LoginTokenDataResponse = User & { token: string };

export type LoginDataResponse<T> = T extends LoginBasicOpts
  ? LoginTokenDataResponse
  : User;

export interface RenewTokenDataResponse {
  token: string;
}
