import { GraphQLSchema } from 'graphql/type/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

const typeDefs: GraphQLSchema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()]
});

export default typeDefs;