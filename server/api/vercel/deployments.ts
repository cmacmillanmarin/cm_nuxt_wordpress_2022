import { handleError } from '~/server/error'
import { VercelDeployments, Deployments } from '~/types/vercel'

export default defineEventHandler(async (event): Promise<Deployments | Error> => {
  console.log('HEEEEEY!')

  try {
    const config = useRuntimeConfig()
    const { VERCEL_API_TOKEN, VERCEL_PROJECT_ID } = config
    const { VERCEL_API_BASE_URL } = config.public

    console.log(event.node.req.url)
    console.log(event.context)

    // const query = useQuery(event)
    console.log(
      `${VERCEL_API_BASE_URL}/deployments?projectId=${VERCEL_PROJECT_ID}&target=production`
    )
    const response = await $fetch<VercelDeployments>(
      `${VERCEL_API_BASE_URL}/deployments?projectId=${VERCEL_PROJECT_ID}&target=production`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        },
      }
    )

    // Parse

    const data: Deployments = {
      pagination: !!response.pagination.next,
      list: [],
    }

    for (const deployment of response.deployments) {
      console.log(deployment)
      data.list.push({
        created: deployment.createdAt.toString(),
        state: deployment.state,
        hook: !!deployment.meta.deployHookId,
      })
    }

    return data
  } catch (err) {
    return new Error()
  }
})
