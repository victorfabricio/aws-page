import { IOClients } from '@vtex/api'

import Lead from './lead'

export class Clients extends IOClients {
  public get lead() {
    return this.getOrSet('lead', Lead)
  }
}
