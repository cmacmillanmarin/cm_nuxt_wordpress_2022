<template>
  <header class="docs-header">
    <nav class="in-grid in-grid--centered">
      <ul class="in-grid__col-6--desktop">
        <li>
          <NuxtLink to="/docs">
            <Logo v-intersect:animate.fade class="will-fade" />
          </NuxtLink>
        </li>
      </ul>
      <ul class="in-grid__col-6--desktop text-align--right">
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

<style lang="scss">
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
  .logo {
    padding-top: 1.6rem;
    width: 8rem;
  }
}
</style>
