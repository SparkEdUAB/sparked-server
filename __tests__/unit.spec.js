import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// const url = "http://localhost:3000/graphiql";
const token = process.env.TOKEN;
const url = process.env.URL;

describe("user resolvers", () => {
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

  test("should create a course and return proper data", async () => {
    const course = await axios.post(url, {
      mutation: `
      mutation {
        addUnit(name: "Fundamentals", createdBy:"olivier") {
          _id
          name
          createdAt
          createdBy
        }
      }
      `
    });
    const {
      data: { addUnit }
    } = course;
    expect(addUnit.name).toBe("Fundamentals");
    expect(addUnit.createdBy).toBe("olivier");
    expect(addUnit.createdAt).toBe(null);
  });
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
});
