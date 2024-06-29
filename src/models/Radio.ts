import type { Model } from "./Model";

export interface Radio extends Model {
  id: string;
  name: string;
  websiteUrl: string;
  videoLiveUrl: string;
}
