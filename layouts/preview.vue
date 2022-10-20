<template>
  <div>
    <ClientOnly>
      <Header />
      <slot />
      <Footer />
    </ClientOnly>
  </div>
</template>
