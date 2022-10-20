<template><div /></template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
router.push(route.query.to.toString())
</script>
