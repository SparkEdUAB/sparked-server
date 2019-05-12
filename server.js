import express from "express";
import mongoose from "mongoose";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";

// Accountjs helpers

import { DatabaseManager } from "@accounts/database-manager";
import { AccountsModule } from "@accounts/graphql-api";
import MongoDBInterface from "@accounts/mongo";
import { AccountsPassword } from "@accounts/password";
import { AccountsServer } from "@accounts/server";

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

// mongoConnection = mongoose.connection;

// Build a storage for storing users
const userStorage = new MongoDBInterface(
  mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`, {
    useMongoClient: true
  })
);
// Create database manager (create user, find users, sessions etc) for accounts-js
const accountsDb = new DatabaseManager({
  sessionStorage: userStorage,
  userStorage
});

const accountsPassword = new AccountsPassword({
  // This option is called when a new user create an account
  // Inside we can apply our logic to validate the user fields
  validateNewUser: user => {
    // For example we can allow only some kind of emails
    if (user.email.endsWith(".xyz")) {
      throw new Error("Invalid email");
    }
    return user;
  }
});

// Create accounts server that holds a lower level of all accounts operations
const accountsServer = new AccountsServer(
  { db: accountsDb, tokenSecret: "secret" },
  {
    password: accountsPassword
  }
);

// Creates resolvers, type definitions, and schema directives used by accounts-js
const accountsGraphQL = AccountsModule.forRoot({
  accountsServer
});

const graphQLServer = express();

const resolvers = mergeResolvers([courseResolvers, unitResolvers]);
const typeDefs = mergeTypes([
  // accountsGraphQL.resolvers,
  courseTypeDefs,
  unitTypeDefs
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives
  }
});
const server = new ApolloServer({
  schema,
  context: accountsGraphQL.context
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
