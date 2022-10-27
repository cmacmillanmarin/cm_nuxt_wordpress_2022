import { VercelDeployments, Deployments } from '~/types/vercel'

export default defineEventHandler(async (event): Promise<Deployments | Error> => {
  const config = useRuntimeConfig()
  const { VERCEL_API_TOKEN, VERCEL_PROJECT_ID } = config
  const { VERCEL_API_BASE_URL } = config.public

  const query = useQuery(event)

  const response = await $fetch<VercelDeployments>(
    `${VERCEL_API_BASE_URL}/deployments?projectId=${VERCEL_PROJECT_ID}&target=production&limit=${query.limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      },
    }
  )

  const data: Deployments = {
    pagination: !!response.pagination.next,
    list: [],
  }

  for (const deployment of response.deployments) {
    data.list.push({
      created: deployment.createdAt.toString(),
      state: deployment.state,
      hook: !!deployment.meta.deployHookId,
    })
  }

  return data
})
