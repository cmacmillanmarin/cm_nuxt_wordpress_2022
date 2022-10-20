<template>
  <div>
    <h1>Nuxt + Wordpress CMS 2022</h1>
    <div v-for="post in posts">
      <h2>{{ post.title }}</h2>
      <div v-html="post.content" />
    </div>
    <About />
  </div>
</template>

<script lang="ts" setup>
import useStore from '~/store/useStore'
import { WordpressPost, parsePosts } from '~/types/wordpress/post'

const config = useRuntimeConfig()

const store = useStore()

console.log(
  '/ deploy refreshToken ->',
  store.preview.refreshToken,
  store.preview.refreshToken === config.public.WP_REFRESH_VALUE
)

const { data } = await useAsyncData<Array<WordpressPost>>(
  `posts-${store.preview.refreshToken}`,
  () =>
    $fetch(`/posts`, {
      baseURL: config.public.WP_REST_API_BASE_URL,
      params: {
        refresh: store.preview.refreshToken,
      },
    })
)
const posts = computed(() => parsePosts(data.value))
</script>
