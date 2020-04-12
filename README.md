[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/SparkEdUAB/sparked-server) 

## sparked-server

[![Build Status](https://travis-ci.com/SparkEdUAB/sparked-server.svg?branch=master)](https://travis-ci.com/SparkEdUAB/sparked-server)
[![Build Status](https://dev.azure.com/Manolivier930767/SparkEd/_apis/build/status/sparked-srv%20-%20CI?branchName=master)](https://dev.azure.com/Manolivier930767/SparkEd/_build/latest?definitionId=3&branchName=master)
[![Build Status](https://dev.azure.com/Manolivier930767/SparkEd/_apis/build/status/sparked-srv%20-%20CI?branchName=master&jobName=Build)](https://dev.azure.com/Manolivier930767/SparkEd/_build/latest?definitionId=3&branchName=master)
![GitHub](https://img.shields.io/github/license/Sparkeduab/sparked-server.svg?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sparkeduab/sparked-server.svg?style=flat-square)
![David](https://img.shields.io/david/dev/sparkeduab/sparked-server.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/sparkeduab/sparked-server.svg?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sparkeduab/sparked-server.svg?style=flat-square)

SparkEd is a responsive cross-browser software that helps you organize and present educational and training content, it supports different types of resources, v2 has been used in several schools in Ethiopia with more than 15000 resources on a single instance.

This is an initial graph representation of sparked-server
![graph representation ](gr-updated.png)
The above graph is initial and doesn't contain all data, this is likely to be updated.

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
## Development

**requirements**

- Node ˆv6
- npm@latest
- MongoDb

Clone the repo

`git clone https://github.com/OlivierJM/sparked-server.git`  
`cd sparked-server`

install dependencies

`npm install` or `yarn`

create a file in the root of the project called `.env` and add your contents as follows.

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


**Running**

`npm dev` or `yarn dev`

**Testing**

`yarn test`

**Contribution**

Fork this repo and clone your forked repo

`git clone https://github.com/your-github-username/sparked-server.git`

Add this repo to your remotes as upstream.

`git remote add upstream https://github.com/SparkEdUAB/sparked-server`

Before pushing anything to your fork, always

`git pull upstream`

> Don't forget to add the .env file mentioned above.

**Note:** Make sure all tests are passing and there are no lint errors before pushing, if you make changes to the code add the tests for that.

Thank you 

