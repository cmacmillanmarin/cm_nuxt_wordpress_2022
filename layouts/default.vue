<template>
  <div class="__layout">
    <Header />
    <slot />
    <Footer />
    <HelpersPreview v-if="store.isPreview" />
  </div>
</template>

<script lang="ts" setup>
import useStore from '~/store/useStore'

const store = useStore()
</script>
