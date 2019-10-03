/* eslint-disable */
import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// resolvers
import resolvers from './resolvers'

// typedefs
import typeDefs from './typdefs'

import { Course } from './models/courses'
import env from '../configs/env.json'

dotenv.config()

mongoose.Promise = global.Promise

// Build a storage for storing users

//<dbuser>:<dbpassword>@ds157276.mlab.com:57276/sparked-test
// todo: check the current environment and run a specific db
mongoose.connect(
  `mongodb://${env.USER.value}:${
    env.PASS.value
  }@ds157276.mlab.com:57276/sparked-test`,
  { useNewUrlParser: true }
)

const graphQLServer = express()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const _user = req.user
    return {
      user: _user,
      SECRET: env.SECRET.value,
    }
  },
  // temporaly allow the playground in production
  introspection: true,
  playground: true,
})

const authUser = async req => {
  const token = await req.headers['authorization']

  try {
    const { user } = await jwt.verify(token, env.SECRET.value)
    req.user = user
    req.isAuth = true
  } catch (error) {
    req.isAuth = false
  }
  req.next()
}
graphQLServer.use(authUser)
server.applyMiddleware({ app: graphQLServer, path: '/graphiql' })

// rest api instead
// you can define other endpoints here
graphQLServer.get('/courses', (req, res, next) => {
  Course.find({}).exec((_err, _res) => res.json(_res))
})

const port = process.env.NODE_ENV === 'production' ? 8080 : 3000
graphQLServer.listen(port, () =>
  console.log(`GraphiQL is now running on http://localhost:${port}/graphiql`)
)
