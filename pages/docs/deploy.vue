<template>
  <div class="docs-deploy">
    <div class="in-grid">
      <div class="in-grid__col-3--mobile in-grid__col-6--desktop">
        <h1>Deployments</h1>
      </div>
      <div class="in-grid__col-3--mobile in-grid__col-6--desktop text-align--right">
        <Button label="Deploy 🚀" @click="deploy" />
      </div>
      {{ call }}
      <DocsVercelDeployment
        v-for="deployment in deployments.list"
        :data="deployment"
        class="in-grid__col-6--mobile in-grid__col-12--desktop" />
      <div class="in-grid__col-6--mobile in-grid__col-12--desktop text-align--center">
        <Button v-if="deployments.pagination" label="Load More" @click="loadMore" />
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

watchEffect(async () => {
  deployments.value = await $fetch<Deployments>(
    `/api/vercel/deployments?limit=${deploymentsLimit.value}`
  )
})

function deploy() {
  alert('deploy')
}

function loadMore() {
  deploymentsLimit.value += deploymentsIncrement.value
}

console.log('/docs/deployments')
</script>
