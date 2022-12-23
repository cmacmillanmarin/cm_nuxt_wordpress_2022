<template>
  <div class="docs-vercel-deployment">
    <div class="docs-vercel-deployment__state">
      <span
        :class="[
          'docs-vercel-deployment__state__icon',
          { 'docs-vercel-deployment__state__icon--ready': deploymentStateReady },
          { 'docs-vercel-deployment__state__icon--error': deploymentStateError },
          { 'docs-vercel-deployment__state__icon--building': deploymentStateBuilding },
        ]" />
      <span class="docs-vercel-deployment__state__label">
        {{ data.state.toLowerCase() }}
      </span>
    </div>
    <div v-if="deploymentInProgress" class="docs-vercel-deployment__building">
      <DocsLoading />
      <!-- <button class="docs-vercel-deployment__building__cancel-btn" @click="cancel" /> -->
    </div>
    <p v-else class="docs-vercel-deployment__time">
      <span>{{ data.time }}s</span>
    </p>
    <p class="docs-vercel-deployment__title">{{ data.title }}</p>
    <p class="docs-vercel-deployment__type">{{ data.hook ? 'Update' : 'Release' }}</p>
    <p class="docs-vercel-deployment__date">{{ data.date }}</p>
  </div>
</template>

<script lang="ts" setup>
import { Deployment } from '~/types/vercel'
const props = defineProps<{ data: Deployment }>()

const deploymentStateReady = computed<boolean>(() => props.data.state === 'READY')
const deploymentStateBuilding = computed<boolean>(() => props.data.state === 'BUILDING')
const deploymentStateError = computed<boolean>(
  () => props.data.state === 'ERROR' || props.data.state === 'CANCELED'
)

const deploymentInProgress = computed<boolean>(
  () => !deploymentStateReady.value && !deploymentStateError.value
)

function cancel(): void {
  console.log('cancel deployment')
}
</script>

<style lang="scss">
.docs-vercel-deployment {
  display: flex;
  align-items: center;
  padding: var(--gap-l) var(--gap-m);

  &__state,
  &__time,
  &__title,
  &__date,
  &__type {
    padding-left: var(--gap-m);
  }

  &__state {
    display: flex;
    align-items: center;
    padding-right: var(--gap-m);
    width: 10%;

    &__icon {
      display: block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;

      background-color: var(--light-grey);
      border: 1px solid var(--mid-grey);

      &--ready {
        background-color: var(--docs-light-green);
        border: 1px solid var(--docs-mid-green);
      }

      &--building {
        background-color: var(--docs-light-orange);
        border: 1px solid var(--docs-mid-orange);
      }

      &--error {
        background-color: var(--docs-light-red);
        border: 1px solid var(--docs-mid-red);
      }
    }

    &__label {
      margin-left: var(--gap-s);
      text-transform: capitalize;
    }
  }

  &__time {
    width: 4rem;
    text-align: center;
    padding-left: 0;
    font-variant-numeric: tabular-nums;
    color: var(--mid-grey);
  }

  &__building {
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    // &__cancel-btn {
    //   border-radius: 50%;
    //   width: 2rem;
    //   height: 2rem;
    //   background-color: var(--docs-mid-red);
    //   border: 1px solid var(--docs-light-red);
    //   padding: 0;
    //   margin-left: var(--gap-xs);
    // }
  }

  &__title {
    flex: 1;
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: var(--gap-m);
  }

  &__type {
    flex: 1;
    padding-right: var(--gap-m);
  }

  &__date {
    padding-left: 0;
    font-variant-numeric: tabular-nums;
    // width: 15%;
    color: var(--mid-grey);
    padding-right: var(--gap-m);
  }
}
</style>
