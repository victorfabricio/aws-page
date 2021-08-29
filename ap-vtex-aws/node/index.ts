import type { ClientsConfig, ServiceContext} from '@vtex/api'
import {method, Service } from '@vtex/api'

import { Clients } from './clients'
import { lead } from './middlewares/lead'
import { leadAll } from './middlewares/leadAll'



const TIMEOUT_MS = 800

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service({
  clients,
  routes: {
    leads: method({
      GET: [lead],
    }),
    leadsAll: method({
      GET: [leadAll],
    }),
  },
})
