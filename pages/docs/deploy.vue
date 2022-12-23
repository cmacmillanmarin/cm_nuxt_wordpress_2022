<template>
  <div class="docs-page docs-page--deploy">
    <div class="docs-page--deploy__intro in-grid">
      <div class="docs-page--deploy__intro__title in-grid__col-3--mobile in-grid__col-6--desktop">
        <h1>Deployments</h1>
      </div>
      <div class="docs-page--deploy__intro__btn in-grid__col-3--mobile in-grid__col-6--desktop">
        <DocsButton
          label="Deploy"
          type="primary"
          :inline="true"
          :loading="deployLoading"
          @click="deploy" />
      </div>
    </div>

    <div class="docs-page--deploy__deployments in-grid">
      <div
        :class="[
          'docs-page--deploy__deployments__content',
          'in-grid__col-6--mobile',
          'in-grid__col-12--tablet',
          'in-grid__col-12--desktop',
          {
            'docs-page--deploy__deployments__content--loading':
              deploymentsLoading && !deployments.list.length,
          },
        ]">
        <DocsLoading
          v-if="deploymentsLoading && !deployments.list.length"
          class="docs-page--deploy__deployments__content__loading" />
        <DocsVercelNoDeployments v-else-if="!deployments.list.length" />
        <template v-else>
          <DocsVercelDeployment
            v-for="deployment in deployments.list"
            :key="deployment.id"
            :data="deployment"
            class="docs-page--deploy__deployments__content__deploy" />
        </template>
      </div>

      <DocsButton
        v-if="deployments.list.length && deployments.pagination"
        :loading="deploymentsLoading"
        label="Load More"
        type="secondary"
        @click="loadMore" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import sleep from '~/utils/sleep'
import { Deployments } from '~/types/vercel'

const deployments = ref<Deployments>({ pagination: false, list: [] })
const deploymentsLimit = ref<number>(6)
const deploymentsLoading = ref<boolean>(true)

const deployRefresh = ref<number>(1000)
const deployLoading = ref<boolean>(false)
const deployInProgress = computed<boolean>(
  () => !!deployments.value.list.find(d => isInProgress(d.state))
)

// If there is deployments already loaded, gets the date
// of the last one to load the next chunk from that
const lastLoadedDeployDate = computed<number>(
  () => deployments.value.list[deployments.value.list.length - 1]?.created || 0
)

onMounted((): void => {
  load()
})

async function deploy(): Promise<void> {
  if (deployInProgress.value) {
    alert('Deploy in Progress')
    return
  }
  deployLoading.value = true
  const { success } = await $fetch(`/api/vercel/deploy`)
  if (success) {
    const max = 10
    let it = 0
    while (!deployInProgress.value && it < max) {
      await sleep(deployRefresh.value)
      await load()
      it++
    }
  }
  deployLoading.value = false
}

async function load(): Promise<void> {
  const limit = Math.max(deploymentsLimit.value, deployments.value.list.length)
  const { pagination, list } = await $fetch<Deployments>(`/api/vercel/deployments?limit=${limit}`)
  deployments.value.pagination = pagination
  deployments.value.list = list
  deploymentsLoading.value = false
}

async function loadMore(): Promise<void> {
  deploymentsLoading.value = true
  const until = lastLoadedDeployDate.value
  const limit = deploymentsLimit.value
  const { pagination, list } = await $fetch<Deployments>(
    `/api/vercel/deployments?until=${until}&limit=${limit}`
  )
  deployments.value.pagination = pagination
  deployments.value.list = [...deployments.value.list, ...list]
  deploymentsLoading.value = false
}

function isInProgress(state: string): boolean {
  return state === 'QUEUED' || state === 'INITIALIZING' || state === 'BUILDING'
}

console.log('/docs/deployments')
</script>

<style lang="scss">
.docs-page {
  &--deploy {
    &__intro {
      margin-bottom: var(--gap-xl);
      &__btn {
        text-align: right;
      }
    }
    &__deployments {
      &__content {
        border: var(--border);
        border-radius: var(--border-radius-m);
        &--loading {
          border: none;
        }
        &__loading {
          margin: var(--gap-xl) auto;
        }
        &__deploy {
          border-bottom: var(--border);
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
