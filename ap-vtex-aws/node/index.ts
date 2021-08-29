import type { ClientsConfig, ServiceContext} from '@vtex/api'
import {method, Service } from '@vtex/api'

import { Clients } from './clients'
import { lead } from './middlewares/lead'
import { leadAll } from './middlewares/leadAll'
import { leadPost } from './middlewares/leadPost'



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
    "id":string,
    "name":string ,
    "email":string ,
    "phone":string,
    "level":string
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
})
