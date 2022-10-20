import { defineStore } from 'pinia'
import { State } from '~/types/wordpress/store'
import { parsePosts, WordpressPost } from '~/types/wordpress/post'

export default defineStore('use-wordpress-store', {
  state: (): State => ({
    posts: parsePosts(undefined),
  }),
  getters: {
    baseUrl() {
      const config = useRuntimeConfig()
      return config.public.WP_REST_API_BASE_URL
    },
  },
  actions: {
    async getPosts() {
      const { data } = await useFetch<Array<WordpressPost>>(`${this.baseUrl}/posts`, {
        method: 'GET',
        // initialCache: false,
      })
      if (data) {
        this.posts = parsePosts(data.value)
      }
    },
  },
})
