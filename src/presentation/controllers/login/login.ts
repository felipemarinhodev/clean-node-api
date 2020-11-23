import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login-protocols'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from './../../helpers/http/http-helper'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (authenticationStub: Authentication, validation: Validation) {
    this.authentication = authenticationStub
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
