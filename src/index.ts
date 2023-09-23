import dotenv from 'dotenv';
import express, { json } from 'express';
import http from 'http';
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

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

dotenv.config();
const port: number = Number.parseInt(process.env.PORT) || 4000;

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

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  '/',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/`);