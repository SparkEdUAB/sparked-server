import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

describe('user resolvers', () => {
  test('should create the user', async () => {
    const registerResponse = await axios.post(process.env.URL, {
      query: `
            mutation {
                register(email:"joe@gmail.com", password:"123456"){
                    username
                    email
                    password
                }
                }
        `,
    })

    const {
      data: {
        data: { register },
      },
    } = registerResponse
    expect(register.username).toBeNull()
    expect(register.email).toBe('joe@gmail.com')
  })
  test('user should be able to login', async () => {
    const loginResponse = await axios.post(process.env.URL, {
      query: `
            mutation {
                login(email:"joe@gmail.com", password:"123456")
                }
          `,
    })
    const {
      data: {
        data: { login },
      },
    } = loginResponse
    expect(login).toBeTruthy()
  })
  test("shouldn't login when password when user is not found", async () => {
    const response = await axios.post(process.env.URL, {
      query: `
            mutation {
                login(email:"notfoundguy@gmail.com", password:"3456")
                }
          `,
    })
    const {
      data: { data, errors },
    } = response
    expect(data).toBeNull()
    expect(errors[0].message).toBe('No user found ')
  })
  test("shouldn't login when password is wrong", async () => {
    const userResponse = await axios.post(process.env.URL, {
      query: `
            mutation {
                login(email:"joe@gmail.com", password:"3456")
                }
          `,
    })
    const {
      data: { data, errors },
    } = userResponse
    expect(data).toBeNull()
    expect(errors[0].message).toBe('Incorrect password ')
  })
  test('should log the user in when credentials are correct', async () => {
    const _userResponse = await axios.post(process.env.URL, {
      query: `
            mutation {
                login(email:"joe@gmail.com", password:"123456")
                }
          `,
    })
    const {
      data: { data, errors },
    } = _userResponse
    expect(data).toBeTruthy()
    expect(data.login).toBeDefined()
    expect(errors).toBeNull()
  })
})
