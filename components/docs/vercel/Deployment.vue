<template>
  <div class="vercel-deploy">
    <p>{{ data.state }}</p>
    <p>{{ data.title }}</p>
    <p>{{ data.created }}</p>
    <p>{{ data.hook }}</p>
  </div>
</template>

<script lang="ts" setup>
import { Deployment } from '~/types/vercel'
defineProps<{ data: Deployment }>()
</script>
