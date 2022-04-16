const argon2 = require('argon2')
const supertest = require('supertest')
const { faker } = require('@faker-js/faker')

const rolesData = require('../../../../src/seeders/fixtures/roles')
const database = require('../../../../src/config/db')
const userService = require('../../../../src/services/user')
const roleService = require('../../../../src/services/role')
const tokenUtils = require('../../../../src/utils/token')
const app = require('../../../../src')

const request = supertest(app)

describe('auth', () => {
  beforeAll(async () => {
    await database.sync({ force: true })
    const queryInterface = database.getQueryInterface()
    await queryInterface.bulkInsert('roles', rolesData)
  })

  test('POST to /register with valid user data should return 201', async () => {
    const userData = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request.post('/api/v1/auth/register').send(userData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({})
  })

  test('POST to /register with invalid user data should return 422', async () => {
    const userData = {
      name: 'not valid attribute'
    }

    const response = await request.post('/api/v1/auth/register').send(userData)

    expect(response.status).toBe(422)
  })

  test('POST to /register with invalid user data should return 422 and error should include "username" is required', async () => {
    const userData = {
      name: 'not valid attribute'
    }

    const response = await request.post('/api/v1/auth/register').send(userData)

    expect(response.status).toBe(422)
    expect(response.body).toEqual(
      {
        error: [
          { username: '"username" is required' }
        ]
      })
  })

  test('POST to /register with valid user data should return 201 and user should be saved', async () => {
    const userData = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request.post('/api/v1/auth/register').send(userData)

    expect(response.status).toBe(201)

    const user = await userService.findByUsername(userData.username)

    expect(user).toBeTruthy()
  })

  test('POST to /register with valid user data should return 201, user should be saved and password should be hashed with argon2', async () => {
    const userData = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request.post('/api/v1/auth/register').send(userData)

    expect(response.status).toBe(201)

    const user = await userService.findByUsername(userData.username)

    expect(await argon2.verify(user.password, userData.password)).toBeTruthy()
  })

  test('POST to /register with valid user data should return 201, user should be saved and user should have default role', async () => {
    const userData = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request.post('/api/v1/auth/register').send(userData)

    expect(response.status).toBe(201)

    const user = await userService.findByUsername(userData.username)
    const role = await roleService.findByDefault()

    expect(user.roleUuid).toBe(role.uuid)
  })

  test('POST to /login with valid user should return 200 and body should contains valid user and valid token', async () => {
    const validUser = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }

    await request.post('/api/v1/auth/register').send(validUser)

    const response = await request.post('/api/v1/auth/login').send(validUser)

    expect(response.status).toBe(200)
    expect(response.body?.user?.username).toBe(validUser.username)
    expect(tokenUtils.verifyToken(response.body?.token)).toBeTruthy()
  })

  test('POST to /login with invalid username should return 422', async () => {
    const noValidUser = {
      name: 'bad username',
      password: faker.internet.password()
    }
    const response = await request.post('/api/v1/auth/login').send(noValidUser)

    expect(response.status).toBe(422)
    expect(response.body).toEqual(
      {
        error: [
          { username: '"username" is required' }
        ]
      })
  })

  test('POST to /login with non existing username should return 401', async () => {
    const noExistingUser = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }
    const response = await request.post('/api/v1/auth/login').send(noExistingUser)

    expect(response.status).toBe(401)
  })

  test('POST to /login with valid user and invalid password should return 403', async () => {
    const validUser = {
      username: faker.internet.email(),
      password: faker.internet.password()
    }

    await request.post('/api/v1/auth/register').send(validUser)

    validUser.password = faker.internet.password()

    const response = await request.post('/api/v1/auth/login').send(validUser)

    expect(response.status).toBe(403)
  })
})
