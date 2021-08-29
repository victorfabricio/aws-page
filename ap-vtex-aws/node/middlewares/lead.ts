import { UserInputError } from '@vtex/api'

export async function lead(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx

  ctx.set('Cache-Control','no-cache no-store');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')

  const { lead } = params

  if (!lead) {
    throw new UserInputError('Code is required') // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }

  console.info("TESTE= ",await ctx.clients.lead.getLead(lead as string) )
  const res = await ctx.clients.lead.getLead(lead as string).catch((reason)=>{
    return reason?.response?.data
  })

  
  ctx.body = res;

  await next()
}
