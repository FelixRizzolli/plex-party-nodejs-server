import {
  TVShow,
  MiniSearch,
} from './types.js';

const tvshows: TVShow[] = [
  {
    _type: 'TVSHOW',
    title: '12 Monkeys',
    year: '2015',
    tvdbID: 272644,
    added: new Date("2023-09-19"),
    fromPlex: true,
  },
  {
    _type: 'TVSHOW',
    title: 'Alex Rider',
    year: '2020',
    tvdbID: 370312,
    added: new Date("2023-09-16"),
    fromPlex: true,
  },
  {
    _type: 'TVSHOW',
    title: 'Lupin',
    year: '2021',
    tvdbID: 375921,
    added: new Date("2023-09-17"),
  },
  {
    _type: 'TVSHOW',
    title: 'ONE PIECE',
    year: '2023',
    tvdbID: 392276,
    added: new Date("2023-09-16"),
  },
  {
    _type: 'TVSHOW',
    title: 'Queen of the South',
    year: '2016',
    tvdbID: 306719,
    added: new Date("2023-09-19"),
  },
  {
    _type: 'TVSHOW',
    title: 'The Walking Dead',
    year: '2010',
    tvdbID: 153021,
    added: new Date("2023-09-18"),
    fromPlex: true
  },
  {
    _type: 'TVSHOW',
    title: 'The Witcher',
    year: '2019',
    tvdbID: 362696,
    added: new Date("2023-09-20"),
  },
];


export function getTVShows(): TVShow[] {
  return tvshows;
}

export function getRecentlyAddedTVShows(): TVShow[] {
  return tvshows
    .sort((a: TVShow, b: TVShow) => {
      if (a.added.toISOString() > b.added.toISOString()) return -1;
      if (a.added.toISOString() < b.added.toISOString()) return 1;
      return 0;
    })
    .slice(0, 5);
}

export function searchTVShows(): TVShow[] {
  return tvshows;
}

export function miniSearchTVShows(): MiniSearch {
  return {
    "fromPlex": tvshows
                  .filter((tvshow: TVShow) => (tvshow.fromPlex))
                  .sort((a: TVShow, b: TVShow) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                  })
                  .slice(0, 5),
    "fromTVDB": tvshows
                  .filter((tvshow: TVShow) => (!tvshow.fromPlex))
                  .sort((a: TVShow, b: TVShow) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                  })
                  .slice(0, 5),
  };
}