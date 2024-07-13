import type { Model } from "./Model";
import type { DiffusionLink, OnDemandLink } from "../types/radio/DiffusionLink";

export interface Radio extends Model {
  id: string;
  name: string;
  websiteUrl: string;
  liveStream: (DiffusionLink | OnDemandLink)[];
  videoLiveUrl: string;
}
