import useStore from '~/store/useStore'
import { WordpressTypes } from '~/types/wordpress/index'

export default function useWordpress() {
  const store = useStore()
  const config = useRuntimeConfig()
  const { WP_REFRESH_VALUE, WP_REST_API_BASE_URL } = config.public

  async function fetch(call: string) {
    //
    // Fetch
    // TODO: @Christian Explain
    //
    const { refreshToken } = store.preview
    const cache = refreshToken === WP_REFRESH_VALUE
    const key = `${getKey(call)}-${refreshToken}`

    console.log(`$fetch('${call}', { key: '${key}', cache: ${cache} })`)

    const { data, error } = await useAsyncData<WordpressTypes>(key, () =>
      $fetch(call, {
        baseURL: WP_REST_API_BASE_URL,
        params: {
          refresh: refreshToken,
        },
      })
    )
    return { data, error }
  }

  function getKey(call: string) {
    return call.substring(1).replaceAll('/', '-')
  }

  return { fetch }
}
