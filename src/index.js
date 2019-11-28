/* eslint-disable */
import express from "express";
import mongoose from "mongoose";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// resolvers
import resolvers from "./resolvers";

// typedefs
import typeDefs from "./typdefs";

import { Course } from "./models/courses";
import http from "http";

dotenv.config();

mongoose.Promise = global.Promise;

// Build a storage for storing users

//<dbuser>:<dbpassword>@ds157276.mlab.com:57276/sparked-test
// todo: check the current environment and run a specific db
//mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASS}@ds157276.mlab.com:57276/sparked-test`, {
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const graphQLServer = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const server = new ApolloServer({
  schema,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }
    const _user = req.user;
    return {
      user: _user,
      SECRET: process.env.SECRET
    };
  },
  formatError: error => {
    return error;
  },
  formatResponse: response => {
    return response;
  },
  // temporaly allow the playground in production
  introspection: true,
  playground: true
});

const authUser = async req => {
  const token = await req.headers["authorization"];

  try {
    const { user } = await jwt.verify(token, process.env.SECRET);
    req.user = user;
    req.isAuth = true;
  } catch (error) {
    req.isAuth = false;
  }
  req.next();
};
graphQLServer.use(authUser);
// graphQLServer.use('/files', express.static('public'))
graphQLServer.use("/public", express.static("public"));

const httpServer = http.createServer(graphQLServer);
server.applyMiddleware({ app: graphQLServer, path: "/graphiql" });
server.installSubscriptionHandlers(httpServer);
// rest api instead
// you can define other endpoints here
graphQLServer.get("/api/courses", (req, res, next) => {
  Course.find({}).exec((_err, _res) => res.json(_res));
});

// const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;
const port = process.env.PORT;
httpServer.listen(port, () => {
  // console.log(`GraphiQL is now running on http://localhost:${port}/graphiql`);
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
});
