<template>
  <div class="docs-page docs-page--home">
    <DocsIntro
      :title="intro.title"
      :description="intro.description"
      :version="intro.version"
      class="docs-page--home__intro" />

    <nav class="docs-page--home__nav">
      <div class="in-grid">
        <h2>{{ sectionsTitle }}</h2>
      </div>
      <ul class="docs-page--home__nav__list in-grid">
        <li
          v-for="link in links"
          class="docs-page--home__nav__list__item in-grid__col-6--mobile in-grid__col-6--tablet in-grid__col-4--desktop">
          <NuxtLink :to="link.url" :target="link.target">
            <DocsLink :title="link.title" :description="link.description">
              <template #icon>
                <Component :is="link.icon" />
              </template>
            </DocsLink>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { Intro, Link } from '~/types/docs/index'

const config = useRuntimeConfig()

const intro = ref<Intro>({
  title: 'Welcome to the Docs!',
  description:
    'A solution to cover all your needs. The docs have been written to allow non-technical people manage the site with confidence.',
  version: 'v 1.0.0',
})

const sectionsTitle = 'Sections'
const links = ref<Array<Link>>([
  {
    icon: 'IconDocs',
    url: '/docs/guide',
    title: 'Guides',
    description: 'Learn how to contribute new, or edit existing, site content.',
  },
  {
    icon: 'IconEdit',
    url: config.public.WP_BASE_URL + '/wp-login.php',
    target: '_blank',
    title: 'CMS',
    description: 'Direct access to the site CMS. Powered by Wordpress.',
  },
  {
    icon: 'IconTemplate',
    url: '/preview',
    target: '_blank',
    title: 'Preview',
    description:
      'Direct access to the site Preview. Check the latest content changes before deploying.',
  },
  {
    icon: 'IconDeploy',
    url: '/docs/deploy',
    title: 'Deploy',
    description:
      'Publish the latest content changes. Check the latest deployment progress, version, state, etc.',
  },
])

console.log('/docs')
</script>

<style lang="scss">
.docs-page {
  &--home {
    &__intro {
      margin-bottom: var(--gap-l);
    }
    h2 {
      margin-bottom: var(--gap-l);
      font-size: var(--font-size-6xl);
      font-weight: var(--font-weight-semibold);
    }
  }
}
</style>
