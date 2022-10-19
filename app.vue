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

const route = useRoute()

const layout = computed(() => {
  const name = route.name.toString()
  if (name.includes('admin')) return 'admin'
  return 'default'
})
</script>

<style lang="scss">
main {
  --color-primary: v-bind(primary);
}
</style>
