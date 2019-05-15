import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZDkzYzJkMzFiYzRjMmVmYjhlOTkyNCIsImVtYWlsIjoib2xpdmllckBnbWFpbC5jb20ifSwiaWF0IjoxNTU3OTAwNDg4LCJleHAiOjE1NTg1MDUyODh9.yntMrz474NMoJSlPu_PHfGpOaYqwsVRXyRryHi_w5Uw";
const url = "http://localhost:3000/graphiql";
describe("user resolvers", () => {
  test("should query all units", async () => {
    const response = await axios.post(
      url,
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

  test("should return an error when not authenticated", async () => {
    const responseData = await axios.post(url, {
      query: `
        query {
            getUnits {
                name
                _id
            }
        }
        `
    });
    const {
      data: { data, errors }
    } = responseData;

    expect(data.getUnits).toBe(null);
    expect(errors[0].message).toBe("you must be logged in");
  });
});
