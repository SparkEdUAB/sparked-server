import express from "express";
import mongoose from "mongoose";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import jwt from "jsonwebtoken";
// resolvers
import courseResolvers from "./data/resolvers/course";
import unitResolvers from "./data/resolvers/unit";
import userResolvers from "./data/resolvers/user";

// typedefs
import courseTypeDefs from "./data/typdefs/course";
import unitTypeDefs from "./data/typdefs/unit";
import userTypeDefs from "./data/typdefs/user";

import {
  GRAPHQL_PORT,
  MONGO_PORT,
  MONGO_URL,
  dbName
} from "./data/config/config";
import { Course } from "./data/models/courses";

const SECRET = "sudfnsjdfnkdsfu48243092incweuchw";

mongoose.Promise = global.Promise;

// mongoConnection = mongoose.connection;

// Build a storage for storing users
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`, {
  useMongoClient: true
});

const graphQLServer = express();

const resolvers = mergeResolvers([
  courseResolvers,
  unitResolvers,
  userResolvers
]);
const typeDefs = mergeTypes([courseTypeDefs, unitTypeDefs, userTypeDefs]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
    SECRET
  })
});

const authUser = async req => {
  const token = await req.headers["authorization"];
  try {
    const { user } = jwt.verify(token, SECRET);
    req.user = user;
  } catch (error) {
    console.log(error);
  }
  req.next();
};
graphQLServer.use(authUser);
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
