import axios from 'axios'

export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const orderId = ctx.body.orderId
  const orderBody = await ctx.clients.order.order(orderId)

  const profileId = orderBody.clientProfileData.userProfileId
  const userFirstName = (await ctx.clients.profile.getEmail(profileId))
    .firstName
  const userLastName = (await ctx.clients.profile.getEmail(profileId)).lastName
  const userFullName = userFirstName + ' ' + userLastName
  const userPhone = (await ctx.clients.profile.getEmail(profileId)).homePhone
  const userEmail = (await ctx.clients.profile.getEmail(profileId)).email

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
        axios
          .post(`http://jkamadio--hiringcoders202111.myvtex.com/_v/leads/new`, {
            id: userEmail,
            email: userEmail,
            name: userFullName,
            phone: userPhone,
            category: 'cliente',
          })
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.info(err)
          })
      } else {
        axios
          .patch(
            `https://50ucek28u1.execute-api.sa-east-1.amazonaws.com/leads/${userEmail}`,
            {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'X-VTEX-Use-Https': 'true',
                'Proxy-Authorization': 'ctx.authToken',
              },
            }
          )
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.info(err)
          })
      }
    })

  await next()
}
