import { UserInputError } from '@vtex/api'
import { json } from 'co-body';

export async function leadPost(ctx: Context, next: () => Promise<any>) {
  const body = (await json (ctx.req))

  ctx.set('Cache-Control','no-cache no-store');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')
  ctx.set('Access-Control-Allow-Origin','*')


  const res = await ctx.clients.lead.getPost('',body).catch((reason)=>{
    return reason?.response?.data
  })

  
  ctx.body = res;

  await next()
}
