<template>
  <div ref="el" class="__layout">
    <Header />
    <slot />

    <Footer />
    <HelpersPreview v-if="store.isPreview" />
  </div>
</template>

<script lang="ts" setup>
import useStore from '~/store/useStore'

const store = useStore()
const scroll = useScroll()

const el = ref<HTMLElement>()

onMounted(() => {
  scroll.create({
    el: el.value,
  })
})
</script>
