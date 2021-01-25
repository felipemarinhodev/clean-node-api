import { makeSignUpValidation } from './signup-validation-factory'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { Controller } from '../../../presentation/protocols'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
