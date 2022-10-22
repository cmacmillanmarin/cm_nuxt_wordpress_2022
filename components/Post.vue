<template>
  <div class="post">
    <NuxtLink :to="link">
      <div class="post__thumbnail" />
    </NuxtLink>
    <NuxtLink :to="link">
      <h2 class="post__title">
        {{ data.title }}
      </h2>
    </NuxtLink>
    <div class="post__content" v-html="data.content" />
    <Button :to="link" :label="'read more'" />
  </div>
</template>

<script lang="ts" setup>
import { Post } from '~/types/wordpress/post'

const props = defineProps<{
  data: Post
}>()

const link = `/post/${props.data.slug}`
</script>

<style lang="scss">
.post {
  padding: 0;
  &__thumbnail {
    aspect-ratio: 4 / 5;
    margin-bottom: 1.2rem;
    background: lightgray;
  }
  &__title {
    margin-bottom: 1.2rem;
  }
  &__content {
    margin-bottom: 1.6rem;
  }
}
</style>
