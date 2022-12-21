<template><div /></template>

<script lang="ts" setup>
import useStore from '~/store/useStore'

const route = useRoute()
const router = useRouter()

const store = useStore()

onMounted(async () => {
  store.updatePreview({
    state: true,
    refreshToken: Date.now(),
  })
  const redirect = route.query.to ? route.query.to.toString() : '/'
  router.push(redirect)
})
</script>
