<template>
  <div class="docs-tag">{{ label }}</div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label: string
  }>(),
  {
    label: 'Tag Label',
  }
)
</script>

<style lang="scss">
.docs-tag {
  display: inline-block;
  background-color: var(--docs-light-green);
  border: 1px solid var(--docs-mid-green);
  padding: var(--gap-s);
  border-radius: var(--border-radius-m);
  color: var(--docs-dark-green);
  font-size: var(--font-size-l);
}
</style>
