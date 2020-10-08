import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    const uri = '/test_content_type'
    app.get(uri, (req, res) => {
      res.send('')
    })
    await request(app)
      .get(uri)
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    const uri = '/test_content_type_xml'
    app.get(uri, (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get(uri)
      .expect('content-type', /xml/)
  })
})
