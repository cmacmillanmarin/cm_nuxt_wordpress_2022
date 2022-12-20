<template>
  <div class="docs-page docs-page--guide in-grid">
    <aside>
      <nav>
        <ul>
          <li><NuxtLink to="/docs/guide">Introduction</NuxtLink></li>
          <li><NuxtLink to="/docs/guide/content">Content</NuxtLink></li>
        </ul>
      </nav>
    </aside>
    <div>
      <ContentDoc :path="slug" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const slug = computed<string>(() => `/${route.params.slug}`)
</script>
