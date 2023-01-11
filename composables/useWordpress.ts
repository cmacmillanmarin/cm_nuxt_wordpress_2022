import useStore from '~/store/useStore'
import { WordpressTypes } from '~/types/wordpress/index'

export default function useWordpress() {
  const store = useStore()
  const config = useRuntimeConfig()
  const { WP_REST_API_BASE_URL } = config.public

  async function fetch(call: string) {
    //
    // Fetch
    // refreshToken is used to control the Wordpress and Nuxt caché
    //
    const key = _getKey(call)

    console.log(`$fetch('${call}', { params: { refresh: ${store.refreshToken} })`)

    const { data, error } = await useAsyncData<WordpressTypes>(key, () =>
      $fetch(call, {
        baseURL: WP_REST_API_BASE_URL,
        params: {
          refresh: store.refreshToken,
        },
      })
    )

    return { data, error }
  }

  function _getKey(call: string) {
    return `${call.substring(1).replaceAll('/', '-')}-${store.refreshToken}`
  }

  return { fetch }
}
