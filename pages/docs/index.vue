<template>
  <div class="docs-page docs-page--home">
    <nav class="docs-page--home__nav">
      <ul class="docs-page--home__nav__list in-grid">
        <li
          class="docs-page--home__nav__list__item in-grid__col-3--mobile in-grid__col-6--tablet in-grid__col-4--desktop">
          <NuxtLink to="/docs/guide">Guides</NuxtLink>
        </li>
        <li
          class="docs-page--home__nav__list__item in-grid__col-3--mobile in-grid__col-6--tablet in-grid__col-4--desktop">
          <NuxtLink to="/docs/deploy">Deploy</NuxtLink>
        </li>
        <li
          class="docs-page--home__nav__list__item in-grid__col-3--mobile in-grid__col-6--tablet in-grid__col-4--desktop">
          <NuxtLink to="/docs/preview">Preview</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
console.log('/docs')
</script>

<style lang="scss">
.docs-page {
  &--home {
    &__nav {
      border: 1px solid red;
      &__list {
        &__item {
          border: 1px solid lime;
          border-radius: 2rem;
          height: 20rem;
          a {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
