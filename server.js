import express from "express";
import mongoose from "mongoose";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
// resolvers
import courseResolvers from "./data/resolvers/course";
import unitResolvers from "./data/resolvers/unit";

// typedefs
import courseTypeDefs from "./data/typdefs/course";
import unitTypeDefs from "./data/typdefs/unit";

import {
  GRAPHQL_PORT,
  MONGO_PORT,
  MONGO_URL,
  dbName
} from "./data/config/config";
import { Course } from "./data/models/courses";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`, {
  useMongoClient: true
});
const graphQLServer = express();

const resolvers = mergeResolvers([courseResolvers, unitResolvers]);
const typeDefs = mergeTypes([courseTypeDefs, unitTypeDefs]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const server = new ApolloServer({ schema });

server.applyMiddleware({ app: graphQLServer, path: "/graphiql" });

//rest api instead
// you can define other endpoints here
graphQLServer.get("/courses", (req, res, next) => {
  Course.find({}).exec((_err, _res) => res.json(_res));
});

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
