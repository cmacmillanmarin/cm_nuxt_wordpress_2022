<template>
  <footer>
    <nav>
      <ul>
        <li><a :href="config.public.FE_BASE_URL">Public Site</a></li>
      </ul>
    </nav>
    <div>Footer Admin</div>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
