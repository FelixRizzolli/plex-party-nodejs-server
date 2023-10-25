import { GraphQLSchema } from 'graphql/type/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildSchema, print } from 'graphql';

import mediacontent from './mediacontent';
import query from './query';

const schemas: string[] = [ mediacontent, query ];

const typeDefs: GraphQLSchema = buildSchema(print(mergeTypeDefs(schemas)));

export default typeDefs;