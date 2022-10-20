<template>
  <form>
    <input
      name="email"
      id="email"
      type="text"
      v-model="username"
      autocomplete="username"
      placeholder="username" />
    <input
      name="password"
      id="password"
      type="password"
      v-model="password"
      autocomplete="current-password"
      placeholder="password" />
  </form>
  <p v-if="error">The username or password are incorrect</p>
  <button @click="logIn">Log In</button>
</template>

<script lang="ts" setup>
import useAuthStore from '~/store/useAuthStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref(false)

watch(username, () => {
  error.value = false
})
watch(password, () => {
  error.value = false
})

const logIn: any = async (): Promise<void> => {
  await authStore.logIn({ username: username.value, password: password.value })
  if (authStore.isAuthenticated) {
    if (route.query.r) router.push(route.query.r.toString())
    else router.push(authStore.routes.logged)
  } else {
    error.value = true
  }
}
</script>
