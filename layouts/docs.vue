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
  font-family: var(--font-sans);

  &--docs {
    --header-height: 6rem;
    --footer-height: 6rem;
    --page-gap: 6rem;
    --page-height: calc(var(--vh) - var(--footer-height));

    .docs-page {
      min-height: var(--page-height);
      padding-top: calc(var(--header-height) + var(--page-gap));
      padding-bottom: var(--page-gap);
    }
  }
}
</style>
