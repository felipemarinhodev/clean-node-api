import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
