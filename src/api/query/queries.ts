import { useQuery } from '@tanstack/react-query';
import {ItemReturnType, ListReturnType} from "../dto/listReturnType";
import axios from "axios";
import {AlbumModel, ArtistModel, TrackModel} from "../../models";

const API_BASE = "https://deezer-clone-d7c6f.web.app"

export const useFetchTracks = (q: string) => {
  return useQuery<ListReturnType<TrackModel>>(['tracks', q], async () => {
    const { data } = await axios.get<ListReturnType<TrackModel>>(`${API_BASE}/tracks?q=${q}`);
    return data;
  }, {
    staleTime: 1000000, // 1000 sec
    retry: 3,
    enabled: false,
  });
};

export const useFetchArtist = (id: number) => {
  return useQuery<ItemReturnType<ArtistModel>>(['tracks', id], async () => {
    const { data } = await axios.get<ItemReturnType<ArtistModel>>(`${API_BASE}/artist/${id}`);
    return data;
  }, {
    staleTime: 1000000, // 1000 sec
    retry: 3,
    enabled: false,
  });
};

export const useFetchArtistTopTracks = (id: number) => {
  return useQuery<ListReturnType<TrackModel>>(['top-tracks', id], async () => {
    const { data } = await axios.get<ListReturnType<TrackModel>>(`${API_BASE}/artist/${id}/top`);
    return data;
  }, {
    staleTime: 1000000, // 1000 sec
    retry: 3,
    enabled: false,
  });
};

export const useFetchArtistAlbums = (id: number) => {
  return useQuery<ListReturnType<AlbumModel>>(['albums', id], async () => {
    const { data } = await axios.get<ListReturnType<AlbumModel>>(`${API_BASE}/artist/${id}/albums`);
    return data;
  }, {
    staleTime: 1000000, // 1000 sec
    retry: 3,
    enabled: false,
  });
};
