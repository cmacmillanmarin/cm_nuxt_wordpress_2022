<template>
  <div>
    <h1>Nuxt + Wordpress CMS 2022</h1>
    <p>Localized page: {{ route.params.lang }}</p>
    <div v-for="post in posts">
      <h2>{{ post.title }}</h2>
      <div v-html="post.content" />
    </div>
    <button @click="update">update</button>
    <About />
  </div>
</template>

<script lang="ts" setup>
import { WordpressPost, parsePosts } from '~/types/wordpress/post'

const preview = ref(false)

const route = useRoute()
const config = useRuntimeConfig()

const { data, refresh } = await useAsyncData<Array<WordpressPost>>('posts', () =>
  $fetch(`/posts`, {
    baseURL: config.public.WP_REST_API_BASE_URL,
    params: {
      preview: preview.value,
    },
  })
)
const posts = computed(() => parsePosts(data.value))

const update: any = (): void => {
  preview.value = !preview.value
  refresh()
}

// const wordpressStore = useWordpressStore()
// await wordpressStore.getPosts()
// const { posts } = storeToRefs(wordpressStore)
</script>
