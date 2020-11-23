import { makeSignUpController } from '../factories/signup/signup'
import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
