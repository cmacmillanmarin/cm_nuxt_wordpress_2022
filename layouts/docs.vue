<template>
  <div>
    <ClientOnly>
      <DocsHeader />
      <slot />
      <DocsFooter />
    </ClientOnly>
  </div>
</template>
