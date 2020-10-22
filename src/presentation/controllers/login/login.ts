import { Authentication } from './../../../domain/usecases/authentication'
import { badRequest, serverError } from './../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authenticationStub: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authenticationStub
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
