<template>
  <div>
    <nav>
      <ul>
        <li><NuxtLink to="/docs/deploy">Deploy</NuxtLink></li>
        <li><NuxtLink to="/docs/preview">Preview</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
console.log('/docs')
</script>

<style lang="scss" scoped>
a {
  margin: 0 2rem;
}
</style>
