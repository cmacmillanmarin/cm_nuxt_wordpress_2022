<template>
  <div class="docs-wordpress-login">
    <h1 class="docs-wordpress-login__title">Log in</h1>
    <form class="docs-wordpress-login__form">
      <input
        name="username"
        id="username"
        type="text"
        v-model="username"
        autocomplete="username"
        placeholder="username"
        class="docs-wordpress-login__form__username" />
      <input
        name="password"
        id="password"
        type="password"
        v-model="password"
        autocomplete="current-password"
        placeholder="password"
        class="docs-wordpress-login__form__password" />
    </form>
    <p
      :class="[
        'docs-wordpress-login__form__error-msg',
        { 'docs-wordpress-login__form__error-msg--visible': error },
      ]">
      The username or password are incorrect
    </p>
    <button class="docs-wordpress-login__form__btn" @click="logIn">Log In</button>
  </div>
</template>

<script lang="ts" setup>
import useStore from '~/store/useStore'
import useAuthStore from '~/store/useAuthStore'

const route = useRoute()
const router = useRouter()

const store = useStore()
const authStore = useAuthStore()

const { onEnter } = useKeyboard()

const username = ref('')
const password = ref('')
const error = ref(false)

const logIn: any = async (): Promise<void> => {
  store.updateLoading(true)
  await authStore.logIn({ username: username.value, password: password.value })
  if (authStore.isAuthenticated) {
    if (route.query.redirect) router.push(route.query.redirect.toString())
    else router.push(authStore.routes.logged)
  } else {
    error.value = true
  }
  store.updateLoading(false)
}

watch(onEnter, logIn)

watch(username, () => {
  error.value = false
})

watch(password, () => {
  error.value = false
})
</script>

<style lang="scss">
.docs-wordpress-login {
  &__title {
    margin-bottom: 2rem;
  }
  &__form {
    &__username,
    &__password,
    &__error-msg {
      margin-bottom: 1rem;
    }
    &__error-msg {
      opacity: 0;
      will-change: opacity;
      transition: var(--css-transition);
      &--visible {
        opacity: 1;
      }
    }
  }
}
</style>
