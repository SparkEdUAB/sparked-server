import express from "express";
import mongoose from "mongoose";
import {
  ApolloServer,
  makeExecutableSchema,
  AuthenticationError
} from "apollo-server-express";
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
  dbName,
  SECRET
} from "./data/config/config";
import { Course } from "./data/models/courses";

mongoose.Promise = global.Promise;

// Build a storage for storing users
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`);

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
  context: ({ req }) => {
    const _user = req.user;
    return {
      user: _user,
      SECRET
    };
  }
});

const authUser = async req => {
  const token = await req.headers["authorization"];

  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
    req.isAuth = true;
    console.log(user);
  } catch (error) {
    console.log(error);
  }
  req.next();
};
graphQLServer.use(authUser);
server.applyMiddleware({ app: graphQLServer, path: "/graphiql" });

// rest api instead
// you can define other endpoints here
graphQLServer.get("/courses", (req, res, next) => {
  Course.find({}).exec((_err, _res) => res.json(_res));
});

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
