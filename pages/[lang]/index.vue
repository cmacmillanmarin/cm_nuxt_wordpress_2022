<template>
  <div>
    <p>Localized page: {{ route.params.lang }}</p>
    <About />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>
