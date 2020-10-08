import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    const uri = '/test_cors_parser'
    app.get(uri, (req, res) => {
      res.send()
    })
    await request(app)
      .get(uri)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
