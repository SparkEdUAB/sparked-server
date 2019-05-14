## sparked-server

This serves data for the sparked client

The following are examples of data of GraphQL queries and mutations

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
      id
      name
    }
  }
}
```
