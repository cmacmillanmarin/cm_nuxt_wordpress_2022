<template>
  <div class="docs-link">
    <div class="docs-link__icon">
      <slot name="icon" />
    </div>
    <h3 class="docs-link__title">{{ title }}</h3>
    <p class="docs-link__description">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    description: string
  }>(),
  {
    title: 'Docs link title',
    description: 'Docs link Description',
  }
)
</script>

<style lang="scss">
.docs-link {
  border: var(--border);
  border-radius: var(--border-radius-l);
  padding: var(--gap-l);
  height: 20rem;

  &__icon {
    width: 2.4rem;
    margin-bottom: 1.2rem;
  }

  &__title {
    margin-bottom: 1rem;
    font-weight: var(--font-weight-semibold);
  }

  &__description {
    color: var(--dark-grey);
  }
}
</style>
