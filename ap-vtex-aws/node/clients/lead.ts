import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Lead extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://50ucek28u1.execute-api.sa-east-1.amazonaws.com/leads', context, options)
  }
 
  public async getLead(lead: string): Promise<string> {
    return this.http.get(lead, {
      metric: 'lead-get',
    })
  }

  public async getLeadWithHeaders(
    lead: string
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(lead, {
      metric: 'lead-get-raw',
    })
  }
}
