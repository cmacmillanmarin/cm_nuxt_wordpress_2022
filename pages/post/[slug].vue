<template>
  <div class="post-page">
    <div class="overlay" v-scroll-lock />
    <div class="in-grid">
      <div class="in-grid__col-6--desktop in-grid__col-12--desktop">
        <h1 v-intersect:animate.fade="{}">Post {{ route.params.slug }}</h1>
        <p v-for="i in 100" v-intersect:animate.fade="{}">Lorem Ipsum dolor emet.</p>
      </div>
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.25);
}
</style>
