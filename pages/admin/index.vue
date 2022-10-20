<template>
  <div>
    <nav>
      <ul>
        <li><NuxtLink to="/admin/docs">Docs</NuxtLink></li>
        <li><NuxtLink to="/admin/deploy">Deploy</NuxtLink></li>
        <li><NuxtLink to="/admin/preview">Preview</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
console.log('/admin')
</script>

<style lang="scss" scoped>
a {
  margin: 0 2rem;
}
</style>
