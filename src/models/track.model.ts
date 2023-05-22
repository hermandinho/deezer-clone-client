import {ArtistModel} from "./artist.model";
import {AlbumModel} from "./album.model";

export class TrackModel {
  id!: number;
  title!: string;
  duration!: number;
  artist!: ArtistModel;
  album!: AlbumModel;
}
