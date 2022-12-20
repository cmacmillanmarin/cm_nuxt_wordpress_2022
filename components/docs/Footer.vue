<template>
  <footer class="docs-footer display--flex will-fade" v-intersect:animate.fade>
    <nav class="docs-footer__nav in-grid in-grid--centered">
      <ul class="in-grid__col-6--desktop">
        <li><a :href="config.public.FE_BASE_URL">Public Site</a></li>
      </ul>
      <ul class="in-grid__col-6--desktop text-align--right">
        @cmacmillanmarin
      </ul>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>

<style lang="scss">
.docs-footer {
  height: var(--footer-height);
  border-top: 1px solid grey;
  &__nav {
    width: 100%;
  }
}
</style>
