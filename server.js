import express from "express";
import mongoose from "mongoose";
import { ApolloServer, addMockFunctionsToSchema } from "apollo-server-express";
import resolvers from "./data/resolvers/course";
import typeDefs from "./data/typdefs/course";
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
const server = new ApolloServer({
  typeDefs,
  resolvers
});

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
