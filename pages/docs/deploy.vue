<template>
  <div class="docs-page docs-page--deploy">
    <div class="docs-page--deploy__intro in-grid">
      <div class="docs-page--deploy__intro__title in-grid__col-3--mobile in-grid__col-6--desktop">
        <h1>Deployments</h1>
      </div>
      <div
        class="docs-page--deploy__intro__btn in-grid__col-3--mobile in-grid__col-6--desktop text-align--right">
        <DocsButton label="Deploy" type="primary" :inline="true" @click="deploy" />
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
        <Loading v-if="deploymentsLoading && !deployments.list.length" />
        <DocsVercelNoDeployments v-else-if="!deployments.list.length" />
        <template v-else>
          <DocsVercelDeployment
            v-for="deployment in deployments.list"
            :data="deployment"
            class="docs-page--deploy__deployments__content__deploy" />
        </template>
      </div>

      <DocsButton
        v-if="deployments.list.length && deployments.pagination"
        :loading="deploymentsLoading"
        label="Load More"
        type="secondary"
        @click="load" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { Deployments } from '~/types/vercel'

const deployments: Ref<Deployments> = ref({ pagination: false, list: [] })
const deploymentsLimit = ref(6)
const deploymentsLoading = ref(true)

// If there is deployments already loaded, gets the date
// of the last one to load the next chunk from that
const lastLoadedDeployDate = computed<string>(
  () => deployments.value.list[deployments.value.list.length - 1]?.created || '0'
)

onMounted(() => {
  load()
})

async function deploy(): Promise<void> {
  alert('deploy')
  // deploy
  // load
}

async function load(): Promise<void> {
  deploymentsLoading.value = true
  const { pagination, list } = await $fetch<Deployments>(
    `/api/vercel/deployments?until=${lastLoadedDeployDate.value}&limit=${deploymentsLimit.value}`
  )
  deployments.value.pagination = pagination
  deployments.value.list = [...deployments.value.list, ...list]
  deploymentsLoading.value = false
}

console.log('/docs/deployments')
</script>

<style lang="scss">
.docs-page {
  &--deploy {
    &__intro {
      margin-bottom: var(--gap-xl);
    }
    &__deployments {
      &__content {
        border: var(--border);
        border-radius: var(--border-radius-m);
        &--loading {
          border: none;
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
