import { VercelDeployments, Deployments } from '~/types/vercel'
import { formattedDate } from '~/utils/date'

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
      ${until && until !== '0' ? `&until=${until}` : ''}
    `.replace(/(\r\n|\n|\r|\s)/gm, '')

    console.log(`${VERCEL_API_BASE_URL}/v6/deployments${query}`)

    const response = await $fetch<VercelDeployments>(
      `${VERCEL_API_BASE_URL}/v6/deployments${query}`,
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
      data.list.push({
        title: deployment.meta.githubCommitMessage,
        created: deployment.createdAt,
        date: formattedDate(new Date(deployment.createdAt)),
        ready: deployment.ready,
        time: Math.floor((deployment.ready - deployment.buildingAt) / 1000),
        state: deployment.state,
        hook: !!deployment.meta.deployHookId,
      })
    }

    return data
  } catch (err) {
    return new Error()
  }
})
