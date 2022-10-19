<template>
  <div>
    <ClientOnly>
      <div v-if="!authStore.isAuthenticated">
        <AdminWordpressLogin />
      </div>
      <div v-else>
        <NuxtLink to="/admin/docs">Docs</NuxtLink>
        <NuxtLink to="/admin/deploy">Deploy</NuxtLink>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import useAuthStore from '~/store/useAuthStore'

definePageMeta({
  middleware: ['auth'],
})

const authStore = useAuthStore()
</script>
