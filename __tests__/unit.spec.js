import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZDkzYzJkMzFiYzRjMmVmYjhlOTkyNCIsImVtYWlsIjoib2xpdmllckBnbWFpbC5jb20ifSwiaWF0IjoxNTU3OTAwNDg4LCJleHAiOjE1NTg1MDUyODh9.yntMrz474NMoJSlPu_PHfGpOaYqwsVRXyRryHi_w5Uw";

describe("user resolvers", () => {
  test("should query all users", async () => {
    const response = await axios.post(
      "http://localhost:3000/graphiql",
      {
        query: `
        query {
            getUnits {
                name
                _id
            }
        }
        `
      },
      {
        headers: {
          authorization: token
        }
      }
    );
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        getUnits: [
          {
            name: "Intro",
            _id: "5cd57e27678b6614d053e7ec"
          },
          {
            name: "Second Intro",
            _id: "5cd58e15ed50241878430490"
          },
          {
            name: "Second Intro",
            _id: "5cd7df4e3307401e57700a77"
          },
          {
            name: "Second Intro",
            _id: "5cd7df4f3307401e57700a79"
          },
          {
            name: "Second Intro",
            _id: "5cd7df503307401e57700a7b"
          }
        ]
      }
    });
  });
});
