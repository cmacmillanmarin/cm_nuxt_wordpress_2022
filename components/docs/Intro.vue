<template>
  <div class="docs-intro">
    <div class="in-grid">
      <div class="in-grid__col-6--mobile in-grid__col-8--tablet in-grid__col-8--destkop">
        <DocsTag :label="version" />
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    description: string
    version: string
  }>(),
  {
    title: 'Docs Intro Title',
    description: 'Docs Intro Description',
    version: '1.0.0',
  }
)
</script>

<style lang="scss">
.docs-intro {
  padding-bottom: var(--gap-l);
  .docs-tag {
    margin-bottom: var(--gap-l);
  }
  h1 {
    font-size: var(--font-size-8xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--gap-m);
  }
  p {
    color: var(--dark-grey);
  }
}
</style>
