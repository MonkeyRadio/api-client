import type { Model } from "./Model";

export interface User extends Model {
  id: string;
  nickname: string;
  email: string;
  roles: string[];
}
