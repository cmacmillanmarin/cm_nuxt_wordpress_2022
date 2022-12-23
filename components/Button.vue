<template>
  <component class="button" :is="type" :to="to">
    {{ label }}
  </component>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string
  to?: string
}>()

const type = props.to ? resolveComponent('NuxtLink') : 'button'
</script>

<style lang="scss">
.button {
  display: inline-block;
  cursor: pointer;
  background: var(--color-lime);
  border: none;
  padding: 1.2rem 2rem;
  text-transform: uppercase;
  &:hover {
    color: black;
  }
}
</style>
