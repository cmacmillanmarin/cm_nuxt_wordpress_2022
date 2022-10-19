<template>
  <div>
    <div v-if="!isLoggedIn">Login</div>
    <div>
      <NuxtLink to="/admin/docs">Docs</NuxtLink>
      <NuxtLink to="/admin/deploy">Deploy</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isLoggedIn } = useAuth()
</script>
