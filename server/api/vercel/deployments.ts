import { VercelDeployments, Deployments } from '~/types/vercel'

export default defineEventHandler(async (event): Promise<Deployments | Error> => {
  try {
    const config = useRuntimeConfig()
    const { VERCEL_API_TOKEN, VERCEL_PROJECT_ID } = config
    const { VERCEL_API_BASE_URL } = config.public

    const { limit, until } = getQuery(event)

    const query = `
      ?projectId=${VERCEL_PROJECT_ID}
      &target=production
      &limit=${limit}
      ${until !== '0' ? `&until=${until}` : ''}
    `.replace(/(\r\n|\n|\r|\s)/gm, '')

    console.log(`${VERCEL_API_BASE_URL}/deployments${query}`)

    const response = await $fetch<VercelDeployments>(`${VERCEL_API_BASE_URL}/deployments${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      },
    })

    // Parse

    const data: Deployments = {
      pagination: !!response.pagination.next,
      list: [],
    }

    for (const deployment of response.deployments) {
      data.list.push({
        title: deployment.meta.githubCommitMessage,
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
