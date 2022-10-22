<template>
  <div class="home">
    <div class="home__posts in-grid">
      <Post
        v-for="post in posts"
        :data="post"
        class="in-grid__col-6--mobile in-grid__col-4--tablet in-grid__col-3--desktop" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { parsePosts } from '~/types/wordpress/post'

const wordpress = useWordpress()
const { data } = await wordpress.fetch('/posts')
const posts = computed(() => parsePosts(data.value))

console.log('/')
</script>

<style lang="scss">
.home {
  padding: 4rem 0 8rem;
}
</style>
