import axios from 'axios'

export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const orderId = ctx.body.orderId
  const orderBody = await ctx.clients.order.order(orderId)
  console.log('ORDER_ID ==', orderId)
  console.log('ORDER_BODY ==', orderBody)

  const profileId = orderBody.clientProfileData.userProfileId
  const userEmail = (await ctx.clients.profile.getEmail(profileId)).email
  console.log('USER EMAIL ==', userEmail)

  axios
    .get(
      `http://jkamadio--hiringcoders202111.myvtex.com/_v/leads/${userEmail}`,
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
    .then((response) => {
      if (typeof response.data.Item === 'undefined') {
        console.info('POST')
        axios
          .post(`http://jkamadio--hiringcoders202111.myvtex.com/_v/leads/new`, {
            id: userEmail,
            email: userEmail,
            name: userEmail,
            phone: userEmail,
            category: 'cliente',
          })
          .then((response) => {
            console.log(response)
            setErro(false)
          })
          .catch((err) => {
            setErro(true)
          })
      } else {
        console.info('PATCH')
        axios
          .patch(
            `https://50ucek28u1.execute-api.sa-east-1.amazonaws.com/leads/${userEmail}`,
            {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate', 'X-VTEX-Use-Https': 'true', 'Proxy-Authorization': 'ctx.authToken',
              }
          )
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.info('ERROR 2 =', err)
          })
      }
    })

  await next()
}
