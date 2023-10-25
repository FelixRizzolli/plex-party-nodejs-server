import dotenv from 'dotenv';
import express, { json } from 'express';
import http from 'http';
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { 
  ApolloServerPluginLandingPageLocalDefault, 
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default';

import typeDefs from './schema/typedefs.js';
import resolvers from './resolvers/resolvers.js';
import { connectToDatabase } from './datasources/mongodb.js';

dotenv.config();
const port: number = Number.parseInt(process.env.PORT) || 4000;

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [
    (() => {
      if (process.env.NODE_ENV === 'production') {
        return ApolloServerPluginLandingPageProductionDefault();
      }
      return ApolloServerPluginLandingPageLocalDefault();
    })(),
    ApolloServerPluginDrainHttpServer({ httpServer })
  ],
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

connectToDatabase(async (error) => {
  if (!error) {
    await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  }
});

module.exports = app;