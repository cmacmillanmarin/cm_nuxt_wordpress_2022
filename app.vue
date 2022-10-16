<template>
  <main>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()
const { primary } = appConfig.theme.colors
const layout = 'default'
</script>

<style lang="scss">
main {
  --color-primary: v-bind(primary);
}
</style>
