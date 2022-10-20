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
      const { data, refresh } = await useFetch<Array<WordpressPost>>(`${this.baseUrl}/posts`, {
        method: 'GET',
        // initialCache: false,
      })
      //   console.log(`${this.baseUrl}/posts`)
      refresh()
      if (data) {
        // console.log(this.baseUrl)
        this.posts = parsePosts(data.value)
      }
    },
  },
})
