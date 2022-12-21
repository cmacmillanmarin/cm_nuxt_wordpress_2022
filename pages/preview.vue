<template><div /></template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const redirect = route.query.to ? route.query.to.toString() : '/'
  router.push(redirect)
})
</script>
