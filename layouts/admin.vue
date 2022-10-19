<template>
  <div>
    <AdminHeader />
    <slot />
    <AdminFooter />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>
