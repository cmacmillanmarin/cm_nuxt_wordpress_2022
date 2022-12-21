<template>
  <header class="docs-header">
    <nav class="docs-header__nav in-grid in-grid--centered">
      <ul class="in-grid__col-6--desktop">
        <li>
          <NuxtLink to="/docs">
            [Logo] Docs
            <!-- <Logo v-intersect:animate.fade class="will-fade" /> -->
          </NuxtLink>
        </li>
      </ul>
      <ul class="in-grid__col-6--desktop text-align--right">
        <li><DocsAccount @log-out="logOut" /></li>
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
  background-color: var(--transparent-white);
  height: var(--header-height);
  border-bottom: var(--border);
  display: flex;
  &__nav {
    width: 100%;
  }
}
</style>
