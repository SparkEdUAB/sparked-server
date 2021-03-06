import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.TOKEN
const url = process.env.URL

describe('unit resolvers', () => {
  beforeAll(async () => {
    // TODO: Find a better solution for this
    await axios.post(url, {
      query: `
              mutation {
                register(email: "joe@gmail.com", password: "123456", name:"some") {
                  username
                  email
                  password
                }
              }
        `,
    })
  })
  test('should not return an error when not authenticated', async () => {
    const responseData = await axios.post(url, {
      query: `
        query {
          getUnits {
            name
            _id
          }
        }
      `,
    })
    const {
      data: { data, errors },
    } = responseData

    expect(data.getUnits).toStrictEqual([])
    // units don't require a user to be authenticated when querying
    expect(errors).toBeUndefined()
  })

  test('should not create a unit and return proper data', async () => {
    const unit = await axios.post(url, {
      query: `
          mutation {
            addUnit(name: "Fundamentals", createdBy:"olivier", courseId: "232eew") {
              name
              createdAt
              createdBy
            }
          }
      `,
    })
    const {
      data: {
        data: { addUnit },
        errors,
      },
    } = unit
    expect(addUnit).toBe(null)
    expect(errors[0].message).toBe('you must be logged in to add a unit')
  })

  test('should create a unit and return proper data', async () => {
    const loginResponse = await axios.post(url, {
      query: `
            mutation {
                login(email: "joe@gmail.com", password: "123456")
                }
          `,
    })
    const {
      data: {
        data: { login },
      },
    } = loginResponse

    const unit = await axios.post(
      url,
      {
        query: `
          mutation {
            addUnit(name: "Fundamentals", createdBy:"olivier", courseId: "232eew") {
              name
              createdAt
              createdBy
            }
          }
      `,
      },
      {
        headers: {
          authorization: login,
        },
      }
    )
    const {
      data: {
        data: { addUnit },
      },
    } = unit
    expect(addUnit.name).toBe('Fundamentals')
  })

  test('should query all units', async () => {
    const response = await axios.post(
      url,
      {
        query: `
          query {
              getUnits {
                  name
              }
          }
          `,
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    const { data } = response

    expect(data).toMatchObject({
      data: {
        getUnits: [
          {
            name: 'Fundamentals',
          },
        ],
      },
    })
    expect(data.data).toHaveProperty('getUnits')
    expect(data.data.getUnits[0].name).toBe('Fundamentals')
  })
})
