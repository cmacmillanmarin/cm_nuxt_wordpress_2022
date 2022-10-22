<template>
  <component :class="['button', 'display--inline-block', 'border--none']" :is="type" :to="to">
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
  background: var(--color-lime);
  padding: 1.2rem 2rem;
  text-transform: uppercase;
  &:hover {
    color: black;
  }
}
</style>
