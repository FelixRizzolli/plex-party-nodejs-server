import { 
  getRecentlyAddedMovies,
} from '../data/movies.js';
import { 
  getRecentlyAddedTVShows, 
  getTVShows, 
} from '../data/tvshows.js';
import {
  miniSearch,
  MediaContentTypes,
} from '../data/search.js';
import {
  Movie
} from '../models/MediaContent.js'

const resolvers = {
  Query: {
    movies: () => Movie.getMovies(),
    tvshows: () => getTVShows(),
    recentlyAddedMovies: () => getRecentlyAddedMovies(),
    recentlyAddedTVShows: () => getRecentlyAddedTVShows(),
    miniSearch: () => miniSearch(),
  },
  MediaContent: {
    __resolveType(obj) {
      switch (obj._type) {
        case MediaContentTypes.MOVIE:
          return 'Movie';
        case MediaContentTypes.TVSHOW:
          return 'Movie';
      }
      return null; // GraphQLError is thrown
    }
  }
};

export default resolvers;