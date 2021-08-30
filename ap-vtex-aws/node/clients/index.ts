import { IOClients } from '@vtex/api'

import { OMS } from '@vtex/clients'
import { Profile } from './profile'
import Lead from './lead'

export class Clients extends IOClients {
  public get lead() {
    return this.getOrSet('lead', Lead)
  }
  public get order() {
    return this.getOrSet('order', OMS)
  }
  public get profile() {
    return this.getOrSet('profile', Profile)
  }
}
