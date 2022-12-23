<template>
  <div class="docs-page docs-page--guide in-grid">
    <aside
      class="docs-page--guide__nav in-grid__col-2--tablet in-grid__col-2--desktop in-grid__col-gap-left-1--tablet in-grid__col-gap-left-1--desktop">
      <nav>
        <ul>
          <li><NuxtLink to="/docs/guide">Introduction</NuxtLink></li>
          <li><NuxtLink to="/docs/guide/content">Content</NuxtLink></li>
        </ul>
      </nav>
    </aside>
    <div class="docs-page--guide__content in-grid__col-6--tablet in-grid__col-6--desktop">
      <ContentDoc :path="slug" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const slug = computed<string>(() => `/${route.params.slug}`)
</script>

<style lang="scss">
.docs-page {
  &--guide {
    &__nav {
      // border-right: var(--border);
      li {
        margin-bottom: var(--gap-s);
      }
    }
  }
}
</style>
