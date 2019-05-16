## sparked-server

[![Build Status](https://travis-ci.com/SparkEdUAB/sparked-server.svg?branch=master)](https://travis-ci.com/SparkEdUAB/sparked-server)
![GitHub](https://img.shields.io/github/license/Sparkeduab/sparked-server.svg?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sparkeduab/sparked-server.svg?style=flat-square)
![David](https://img.shields.io/david/dev/sparkeduab/sparked-server.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/sparkeduab/sparked-server.svg?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sparkeduab/sparked-server.svg?style=flat-square)

This serves data for the sparked client

**Setup**

You need to set up an .env file at the roor of the project, it should look like the following

```
TOKEN="thegeneratedtoken"
URL= "http://localhost:3000/graphiql"
GRAPHQL_PORT = 3000
MONGO_PORT = 27017
MONGO_URL = "localhost"
dbName = "sparked"
SECRET = "yoursecretkey"
USER="user"
PASS="pass"
TEST_DB="test"
```

The following are examples of data of GraphQL queries and mutations

### Authentication

All the queries need to be authenticated, you can authenticate via a login mutation
**Register**

```graphql
mutation {
  register(email: "olivier@gmail.com", password: "oL7vi3#") {
    email
    password
  }
}
```

The password is hashed and never stored as plain text, the above mutation will return the email and a hashed password.

**Login**

```graphql
mutation {
  login(email: "olivier@gmail.com", password: "oL7vi3#")
}
```

The above mutation will give you results that include a token like this

```json
{
  "data": {
    "login": "eyJhbGciOIkpXVCJ9.eyJ19pZCI6MzM2MDd9.trf9Rm-4w9nFBl4_gF1DfSTH2__xo"
  }
}
```

You can then use the login token to pass it in headers as "authorization" to authentication any of the queries and mutations below

**Adding a course**

```graphql
mutation {
  addCourse(name: "Introduction") {
    name
  }
}
```

**Querying courses**

```graphql
{
  query {
    getCourses {
      _id
      name
    }
  }
}
```
