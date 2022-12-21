<template>
  <button>{{ label }}</button>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label: string
  }>(),
  {
    label: 'Label',
  }
)
</script>
