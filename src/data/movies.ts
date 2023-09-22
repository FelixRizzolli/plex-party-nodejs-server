import {
  Movie,
  MiniSearch,
} from './types.js';

const movies: Movie[] = [
  {
    _type: 'MOVIE',
    title: '21 Jump Street',
    year: '2012',
    tvdbID: 628,
    added: new Date("2023-09-19"),
    fromPlex: true,
  },
  {
    _type: 'MOVIE',
    title: '22 Jump Street',
    year: '2014',
    tvdbID: 735,
    added: new Date("2023-09-19"),
  },
  {
    _type: 'MOVIE',
    title: '96 Hours',
    year: '2008',
    tvdbID: 525,
    added: new Date("2023-09-19"),
  },
  {
    _type: 'MOVIE',
    title: '96 Hours - Taken 2',
    year: '2012',
    tvdbID: 1148,
    added: new Date("2023-09-18"),
  },
  {
    _type: 'MOVIE',
    title: '96 Hours - Taken 3',
    year: '2014',
    tvdbID: 254,
    added: new Date("2023-09-20"),
  },
  {
    _type: 'MOVIE',
    title: 'Baby Driver',
    year: '2017',
    tvdbID: 342,
    added: new Date("2023-09-19"),
  },
  {
    _type: 'MOVIE',
    title: 'John Wick',
    year: '2014',
    tvdbID: 155,
    added: new Date("2023-09-17"),
  },
  {
    _type: 'MOVIE',
    title: 'John Wick 2',
    year: '2017',
    tvdbID: 511,
    added: new Date("2023-09-20"),
    fromPlex: true,
  },
  {
    _type: 'MOVIE',
    title: 'John Wick 3',
    year: '2019',
    tvdbID: 6494,
    added: new Date("2023-09-15"),
    fromPlex: true,
  },
];

export function getMovies(): Movie[] {
  return movies;
}

export function getRecentlyAddedMovies(): Movie[] {
  return movies
    .sort((a: Movie, b: Movie) => {
      if (a.added.toISOString() > b.added.toISOString()) return -1;
      if (a.added.toISOString() < b.added.toISOString()) return 1;
      return 0;
    })
    .slice(0, 5);
}

export function miniSearchMovies(): MiniSearch {
  return {
    "fromPlex": movies
                  .filter((movie: Movie) => (movie.fromPlex))
                  .sort((a: Movie, b: Movie) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                  })
                  .slice(0, 5),
    "fromTVDB": movies
                  .filter((movie: Movie) => (!movie.fromPlex))
                  .sort((a: Movie, b: Movie) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                  })
                  .slice(0, 5),
  };
}