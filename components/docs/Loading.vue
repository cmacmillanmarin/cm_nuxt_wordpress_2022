<template>
  <div :class="['docs-loading', { 'docs-loading--negative': negative }]" />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    negative?: boolean
  }>(),
  {
    negative: false,
  }
)
</script>

<style lang="scss">
.docs-loading {
  width: 2rem;
  @include aspect-ratio(1, 1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform-origin: center center;

  border: 0.2rem solid rgba(0, 0, 0, 0.2);
  border-top-color: #000;

  &--negative {
    border: 0.2rem solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
