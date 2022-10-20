<template>
  <header>
    <p>Admin header</p>
    <nav>
      <ul>
        <li><NuxtLink to="/admin">Home</NuxtLink></li>
      </ul>
      <ul>
        <li><button @click="logOut">Log out</button></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import useAuthStore from '~/store/useAuthStore'
const authStore = useAuthStore()
const router = useRouter()

const logOut: any = (): void => {
  authStore.logOut()
  router.push(authStore.routes.redirect)
}
</script>
