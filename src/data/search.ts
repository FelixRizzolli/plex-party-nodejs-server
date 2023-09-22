import { miniSearchMovies } from "./movies.js";
import { miniSearchTVShows } from "./tvshows.js";
import { MediaContent, MiniSearch } from "./types.js";

export enum MediaContentTypes {
  MOVIE = 'MOVIE',
  TVSHOW = 'TVSHOW',
}

export function miniSearch(): MiniSearch {
    const movies = miniSearchMovies();
    const tvshows = miniSearchTVShows();
    return {
        "fromPlex": movies.fromPlex
                        .concat(tvshows.fromPlex)
                        .sort((a: MediaContent, b: MediaContent) => {
                          if (a.title > b.title) return 1;
                          if (a.title < b.title) return -1;
                          return 0;
                        })
                        .slice(0, 5),
        "fromTVDB": movies.fromTVDB
                        .concat(tvshows.fromTVDB)
                        .sort((a: MediaContent, b: MediaContent) => {
                          if (a.title > b.title) return 1;
                          if (a.title < b.title) return -1;
                          return 0;
                        })
                        .slice(0, 5),
    }
}