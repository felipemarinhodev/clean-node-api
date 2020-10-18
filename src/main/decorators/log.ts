import {
  HttpRequest,
  HttpResponse,
  Controller
} from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    // if (httpResponse.statusCode === 500) {}
    return null
  }
}
