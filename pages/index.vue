<template>
  <div class="home">
    <div class="home__posts in-grid">
      <Post
        v-for="post in [...posts, ...posts, ...posts]"
        :key="post.slug"
        :data="post"
        class="home__posts__post in-grid__col-6--mobile in-grid__col-4--tablet in-grid__col-3--desktop will-fade"
        v-intersect:animate.fade
        data-scroll />
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
  &__posts {
    &__post {
      will-change: transform, opacity;
    }
  }
}
</style>
