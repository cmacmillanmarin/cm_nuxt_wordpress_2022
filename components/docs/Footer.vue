<template>
  <footer class="docs-footer will-fade" v-intersect:animate.fade>
    <nav class="docs-footer__nav in-grid in-grid--centered">
      <ul class="docs-footer__nav__contact in-grid__col-6--desktop">
        <li><a href="https://macmillan.studio">Contact</a></li>
      </ul>
      <ul class="docs-footer__nav__copy in-grid__col-6--desktop text-align--right">
        <li>© 2023 MacMillan Studio</li>
      </ul>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>

<style lang="scss">
.docs-footer {
  display: flex;
  height: var(--footer-height);
  border-top: var(--border);
  &__nav {
    width: 100%;
    &__copy {
      text-align: right;
    }
  }
}
</style>
