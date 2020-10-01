import { Encrypter } from './../../protocols/encrypter'
import { AccountModel } from '../../../domain/model/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
