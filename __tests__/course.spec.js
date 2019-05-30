import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

describe('courses resolvers', () => {
  test('should query courses even when not authenticated', async () => {
    const responseData = await axios.post(process.env.URL, {
      query: `
        query {
          getCourses {
            name
            _id
          }
        }
      `,
    })
    const {
      data: { data, errors },
    } = responseData

    expect(data.getCourses).toBeDefined()
  })
  test('should not add courses when not authenticated', async () => {
    const createCourse = await axios.post(process.env.URL, {
      query: `
          mutation {
            addCourse(name: "Another Introduction", createdBy:"olivier") {
              name
              createdAt
              createdBy
            }
          }
      `,
    })
    const {
      data: { data, errors },
    } = createCourse
    expect(data.addCourse).toBe(null)
    expect(errors[0].message).toBe('you must be logged in')
  })

  test('should create a course and return proper data', async () => {
    const course = await axios.post(
      process.env.URL,
      {
        query: `
          mutation {
            addCourse(name: "Another Introduction") {
              name
              createdAt
              createdBy
            }
          }
      `,
      },
      {
        headers: {
          authorization: process.env.TOKEN,
        },
      }
    )
    const {
      data: {
        data: { addCourse },
      },
      data,
    } = await course
    // console.log(data)
    expect(addCourse.name).toBe('Another Introduction')
    expect(addCourse).toMatchSnapshot()
  })
  test('should query all courses', async () => {
    const response = await axios.post(
      process.env.URL,
      {
        query: `
          query {
              getCourses {
                  name
              }
          }
          `,
      },
      {
        headers: {
          authorization: process.env.TOKEN,
        },
      }
    )
    const {
      data: { data },
    } = response
    const newItem = data.getCourses[data.getCourses.length - 1]

    expect(newItem).toMatchObject({
      name: 'Another Introduction',
    })
    expect(data).toHaveProperty('getCourses')
    expect(data.getCourses[0].name).toBeDefined()
  })
})
