<template>
  <main>
    <NuxtLayout :name="store.template">
      <NuxtPage />
    </NuxtLayout>

    <HelpersGrid />
  </main>
</template>

<script lang="ts" setup>
import useStore from '~/store/useStore'

const store = useStore()

const appConfig = useAppConfig()
const { lime } = appConfig.theme.colors
</script>

<style lang="scss">
main {
  --color-lime: v-bind(lime);
}
</style>
