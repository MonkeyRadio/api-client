import type { Model } from "../Model";

export interface Metadata extends Model {
  video: boolean;
  displayMetadata: boolean;
  title: string;
  artist: string;
  type: string;
  duration: number;
  album?: string;
  trackNumber?: number;
  year?: number;
  internalId: string;
  tsPosted: number;
  tsUpdated: number;
}
