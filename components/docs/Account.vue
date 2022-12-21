<template>
  <div class="docs-account">
    <button class="docs-account__thumbnail" @click="toggle"></button>
    <nav v-if="open" class="docs-account__nav will-fade" v-intersect:animate.fade>
      <ul>
        <li><button @click="emit('logOut')">Log Out</button></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const open = ref<boolean>(false)

function toggle(): void {
  open.value = !open.value
}

const emit = defineEmits(['logOut'])
</script>

<style lang="scss">
.docs-account {
  position: relative;
  display: inline-block;
  &__thumbnail {
    display: inline-block;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 100%;
    background-color: var(--light-grey);
    padding: 0;
  }
  &__nav {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(0, calc(100% + var(--gap-s)));
    width: 16rem;
    border: var(--border);
    background-color: white;
    text-align: left;
    padding: var(--gap-s);
  }
}
</style>
