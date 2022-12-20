<template>
  <div class="__layout __layout--docs">
    <ClientOnly>
      <DocsHeader />
      <slot />
      <DocsFooter />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.__layout {
  &--docs {
    --header-height: 16rem;
    --footer-height: 6rem;
    --page-height: calc(var(--vh) - var(--footer-height));

    .docs-page {
      min-height: var(--page-height);
      padding-top: var(--header-height);
    }
  }
}
</style>
