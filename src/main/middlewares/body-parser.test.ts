import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    const uri = '/test_body_parser'
    app.post(uri, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(uri)
      .send({ name: 'Felipe' })
      .expect({ name: 'Felipe' })
  })
})
