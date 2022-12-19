<template>
  <footer v-intersect:animate.fade class="will-fade">
    <nav class="in-grid in-grid--centered">
      <ul class="in-grid__col-6--desktop">
        <li><a :href="config.public.FE_BASE_URL">Public Site</a></li>
      </ul>
      <ul class="in-grid__col-6--desktop text-align--right">
        @cmacmillanmarin
      </ul>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>

<style lang="scss">
footer {
  margin: 2rem 0;
}
</style>
