import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { 
  getMovies, 
  getRecentlyAddedMovies,
} from './data/movies.js';
import { 
  getRecentlyAddedTVShows, 
  getTVShows, 
} from './data/tvshows.js';
import {
  miniSearch,
  MediaContentTypes,
} from './data/search.js';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  union MediaContent = Movie | TVShow
  scalar Date
  
  type MiniSearch {
    fromPlex: [MediaContent]
    fromTVDB: [MediaContent]
  }

  type Movie{
    _type: String
    title: String
    year: String
    tvdbID: Int
    added: Date
  }

  type TVShow{
    _type: String
    title: String
    year: String
    tvdbID: Int
    added: Date
  }

  type Query {
    movies: [Movie]
    tvshows: [TVShow]
    recentlyAddedMovies: [Movie]
    recentlyAddedTVShows: [TVShow]
    miniSearch: MiniSearch
  }
`;

const resolvers = {
  Query: {
    movies: () => getMovies(),
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
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);