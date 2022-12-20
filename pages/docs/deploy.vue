<template>
  <div class="docs-page docs-page--deploy">
    <div class="in-grid">
      <div class="in-grid__col-3--mobile in-grid__col-6--desktop">
        <h1>Deployments</h1>
      </div>
      <div class="in-grid__col-3--mobile in-grid__col-6--desktop text-align--right">
        <Button label="Deploy 🚀" @click="deploy" />
      </div>

      {{ call }}

      <Loading v-if="deploymentsLoading" />
      <DocsVercelNoDeployments v-else-if="!deployments.list.length" />
      <template v-else>
        <DocsVercelDeployment
          v-for="deployment in deployments.list"
          :data="deployment"
          class="in-grid__col-6--mobile in-grid__col-12--desktop" />
      </template>

      <div class="in-grid__col-6--mobile in-grid__col-12--desktop text-align--center">
        <Button label="Load More" @click="loadMore" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { Deployments } from '~/types/vercel'

const call = ref(null)
const deployments: Ref<Deployments> = ref({ pagination: false, list: [] })
const deploymentsLimit = ref(6)
const deploymentsIncrement = ref(6)
const deploymentsLoading = ref(true)

watchEffect(async () => {
  deploymentsLoading.value = true
  deployments.value = await $fetch<Deployments>(
    `/api/vercel/deployments?limit=${deploymentsLimit.value}`
  )
  deploymentsLoading.value = false
})

function deploy() {
  alert('deploy')
}

function loadMore() {
  deploymentsLimit.value += deploymentsIncrement.value
}

console.log('/docs/deployments')
</script>
