import type { ClientsConfig, ServiceContext, EventContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { lead } from './middlewares/lead'
import { leadAll } from './middlewares/leadAll'
import { leadPost } from './middlewares/leadPost'
import { someStates } from './middlewares/someStates'

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
  interface LeadData {
    id: string
    name: string
    email: string
    phone: string
    level: string
  }
  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
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
    leadsPost: method({
      POST: [leadPost],
    }),
  },
  events: {
    someStates,
  },
})
