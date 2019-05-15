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
});
