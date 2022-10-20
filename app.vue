<template>
  <main>
    <NuxtLayout :name="store.template">
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script lang="ts" setup>
import useStore from '~/store/useStore'

const store = useStore()

const appConfig = useAppConfig()
const { primary } = appConfig.theme.colors
</script>

<style lang="scss">
main {
  --color-primary: v-bind(primary);
}
</style>
