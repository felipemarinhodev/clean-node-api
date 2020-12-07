import jwt from 'jsonwebtoken'
import { JwtApapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtApapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
