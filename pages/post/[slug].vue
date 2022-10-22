<template>
  <div class="post-page">
    <div class="in-grid">
      <h1>Post {{ route.params.slug }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
console.log(`/post/${route.params.slug}`)
</script>

<style lang="scss">
.post-page {
  padding: 8rem 0 8rem;
}
</style>
