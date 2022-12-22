<template>
  <component
    :class="[
      'docs-button',
      { 'docs-button--primary': isPrimary },
      { 'docs-button--secondary': isSecondary },
      { 'docs-button--inline': inline },
    ]"
    :is="type"
    :to="to">
    {{ loading ? 'Loading' : label }}
  </component>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string
    to?: string
    loading?: boolean
    type: 'primary' | 'secondary'
    inline?: boolean
  }>(),
  {
    loading: false,
    type: 'primary',
    inline: false,
  }
)

const type = props.to ? resolveComponent('NuxtLink') : 'button'
const isPrimary = props.type === 'primary'
const isSecondary = props.type === 'secondary'
</script>

<style lang="scss">
.docs-button {
  cursor: pointer;
  padding: 1.2rem 2rem;
  text-transform: uppercase;
  border-radius: var(--border-radius-m);

  &--primary {
    background: var(--black);
    border: none;
    color: var(--white);
  }

  &--secondary {
    background: transparent;
    border: var(--border);
  }

  &--inline {
    width: auto;
    display: inline-block;
  }

  &:hover {
    color: black;
  }
}
</style>
