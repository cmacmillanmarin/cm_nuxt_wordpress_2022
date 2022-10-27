<template>
  <header clas="header">
    <nav class="in-grid">
      <NuxtLink to="/">
        <Logo v-intersect:animate.fade class="will-fade" />
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="scss">
.logo {
  padding-top: 1.6rem;
  width: 12rem;
}
</style>
