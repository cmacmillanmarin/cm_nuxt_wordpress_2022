import { Deploy, VercelDeploy } from '~/types/vercel/index'

export default defineEventHandler(async (event): Promise<Deploy | Error> => {
  try {
    const config = useRuntimeConfig()
    const { VERCEL_DEPLOY_LINK } = config

    console.log(VERCEL_DEPLOY_LINK)

    const response = await $fetch<VercelDeploy>(VERCEL_DEPLOY_LINK)

    return { success: !!response.job?.id }
  } catch (err) {
    return new Error()
  }
})
