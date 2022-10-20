<template>
  <div>
    <h1>Nuxt + Wordpress CMS 2022</h1>
    <p>Localized page: {{ route.params.lang }}</p>
    <div v-for="post in posts">
      <h2>{{ post.title }}</h2>
      <div v-html="post.content" />
    </div>
    <About />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useWordpressStore from '~/store/useWordpressStore'

const route = useRoute()

const wordpressStore = useWordpressStore()
await wordpressStore.getPosts()
const { posts } = storeToRefs(wordpressStore)
</script>
