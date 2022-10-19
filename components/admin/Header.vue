<template>
  <header>
    <p>Admin header</p>
    <NuxtLink to="/">Public Site</NuxtLink>
    <ClientOnly>
      <button v-if="authStore.isAuthenticated" @click="logOut">Log out</button>
    </ClientOnly>
  </header>
</template>

<script lang="ts" setup>
import useAuthStore from '~/store/useAuthStore'

const authStore = useAuthStore()
const router = useRouter()

const logOut: any = (): void => {
  authStore.logOut()
  router.push(authStore.redir)
}
</script>
