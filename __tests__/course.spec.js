import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

describe("courses resolvers", () => {
  test("should not query courses when not authenticated", async () => {
    const responseData = await axios.post(process.env.URL, {
      query: `
        query {
          getCourses {
            name
            _id
          }
        }
      `
    });
    const {
      data: { data, errors }
    } = responseData;

    expect(data.getCourses).toBe(null);
    expect(errors[0].message).toBe("you must be logged in");
  });

  test("should create a course and return proper data", async () => {
    const course = await axios.post(process.env.URL, {
      query: `
          mutation {
            addCourse(name: "Introduction", createdBy:"olivier") {
              name
              createdAt
              createdBy
            }
          }
      `
    });
    const {
      data: {
        data: { addCourse }
      }
    } = await course;
    expect(addCourse.name).toBe("Introduction");
    expect(addCourse.createdBy).toBe("olivier");
    expect(addCourse.createdAt).toBe(null);
  });
  test("should query all courses", async () => {
    const response = await axios.post(
      process.env.URL,
      {
        query: `
          query {
              getCourses {
                  name
              }
          }
          `
      },
      {
        headers: {
          authorization: process.env.TOKEN
        }
      }
    );
    const { data } = response;

    expect(data).toMatchObject({
      data: {
        getCourses: [
          {
            name: "Introduction"
          }
        ]
      }
    });
    expect(data.data).toHaveProperty("getCourses");
    expect(data.data.getCourses[0].name).toBe("Introduction");
  });
});
