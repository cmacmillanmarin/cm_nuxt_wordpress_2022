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

  const requiresAuth = isAdmin || isPreview

  if (requiresAuth) {
    if (!authStore.isAuthenticated && authToken.value) {
      await authStore.validate(authToken.value)
    }

    if (authStore.isAuthenticated) {
      if (isPreview) {
        store.updateTemplate('preview')
        store.updatePreview({ state: true, refreshToken: Date.now() })
      } else {
        store.updateTemplate('admin')
      }
    } else {
      return navigateTo(`${authStore.routes.redirect}?r=${to.fullPath}`)
    }
  } else {
    store.updateTemplate('default')
    store.updatePreview({ state: false, refreshToken: config.public.WP_REFRESH_VALUE })
  }
})
