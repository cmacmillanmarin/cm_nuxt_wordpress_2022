<template>
  <div>
    <ClientOnly>
      <div v-if="!authStore.isAuthenticated">
        <AdminWordpressLogin />
      </div>
      <div v-else>
        <nav>
          <ul>
            <li><NuxtLink to="/admin/docs">Docs</NuxtLink></li>
            <li><NuxtLink to="/admin/deploy">Deploy</NuxtLink></li>
            <li><NuxtLink to="/admin/preview">Preview</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import useAuthStore from '~/store/useAuthStore'
console.log('/admin')
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
a {
  margin: 0 2rem;
}
</style>
