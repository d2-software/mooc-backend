const supertest = require('supertest')
const app = require('../../../../src')

const request = supertest(app)

describe('status', () => {
  test('should return status 200', async () => {
    const response = await request.get('/api/v1/status')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({})
  })
})
