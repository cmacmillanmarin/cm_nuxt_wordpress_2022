import useStore from '~/store/useStore'
import useAuthStore from '~/store/useAuthStore'
import { Template } from '~/types/store'

export default defineNuxtRouteMiddleware(async to => {
  const store = useStore()
  const authStore = useAuthStore()
  const authToken = useCustomCookie('authToken')
  const config = useRuntimeConfig()

  const isAdmin = to.fullPath.startsWith(`/admin`)
  const isPreview = to.query.preview === 'true' || store.preview.state

  const template: Template = isAdmin ? 'admin' : 'default'

  const requiresAuth = isAdmin || isPreview

  if (requiresAuth) {
    if (!authStore.isAuthenticated && authToken.value) {
      await authStore.validate(authToken.value)
    }

    store.updateTemplate(template)
    if (authStore.isAuthenticated) {
      if (isPreview) {
        store.updatePreview({ state: true, refreshToken: Date.now() })
      }
    } else if (to.fullPath !== authStore.redir) {
      authStore.updateRequest(to.fullPath)
      return navigateTo(authStore.redir)
    }
  } else {
    store.updateTemplate(template)
    store.updatePreview({ state: false, refreshToken: config.public.WP_REFRESH_VALUE })
  }
})
