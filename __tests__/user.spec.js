import axios from "axios";

// describe("user resolvers", () => {
test("should query all users", async () => {
  const response = await axios.post("http://localhost:3000/graphql", {
    query: `
        query {
            getUnits {
                name
                _id
            }
        }
        `
  });
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
// });
