<template>
  <div v-if="!!route.query.grid" class="debug-grid">
    <div class="in-grid">
      <ClientOnly>
        <div
          v-for="i in columns"
          class="in-grid__col in-grid__col-1--mobile in-grid__col-1--tablet in-grid__col-1--desktop" />
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()
//   const { isMobileTemplate } = useTemplate()
const columns = computed(() => 12)
</script>

<style lang="scss" scoped>
.debug-grid {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .in-grid {
    border: 1px solid rgba(255, 0, 0, 0.25);
    height: 100%;
    &__col {
      height: 100%;
      background: rgba(255, 0, 0, 0.15);
    }
  }
}
</style>
