import { DeploymentBuild, VercelDeploymentBuild } from '~/types/vercel'

export default defineEventHandler(async (event): Promise<DeploymentBuild | Error> => {
  try {
    const config = useRuntimeConfig()
    const { VERCEL_API_TOKEN, VERCEL_PROJECT_ID } = config
    const { VERCEL_API_BASE_URL } = config.public

    const { id } = getQuery(event)

    console.log(`${VERCEL_API_BASE_URL}/v11/deployments/${id}/builds`)

    const response = await $fetch<VercelDeploymentBuild>(
      `${VERCEL_API_BASE_URL}/v11/deployments/${id}/builds`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        },
      }
    )

    const readyAt = response.builds[0]?.readyStateAt || 0
    const createAt = response.builds[0]?.createdAt || 0

    return {
      state: response.builds[0]?.readyState,
      time: Math.floor((readyAt - createAt) / 1000),
    }
  } catch (err) {
    return new Error()
  }
})
