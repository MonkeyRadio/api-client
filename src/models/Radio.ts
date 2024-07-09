import type { Model } from "./Model";
import type { DiffusionLink } from "../types/radio/DiffusionLink";

export interface Radio extends Model {
  id: string;
  name: string;
  websiteUrl: string;
  liveStream: DiffusionLink[];
  videoLiveUrl: string;
}
