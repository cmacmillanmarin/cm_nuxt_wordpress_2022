import useStore from '~/store/useStore'
import useAuthStore from '~/store/useAuthStore'

export default defineNuxtRouteMiddleware(async to => {
  const store = useStore()
  const authStore = useAuthStore()
  const authToken = useCustomCookie('authToken')
  const config = useRuntimeConfig()

  if (!authStore.isAuthenticated && authToken.value) {
    await authStore.validate(authToken.value)
  }

  const isAdmin = to.fullPath.startsWith(`/admin`)
  const isPreview = to.fullPath.startsWith(`/preview`) || store.preview.state

  const requiresAuth = isAdmin || isPreview

  if (requiresAuth) {
    if (authStore.isAuthenticated) {
      if (isPreview) {
        store.updateTemplate('default')
        store.updatePreview({ state: true, refreshToken: Date.now() })
      } else {
        store.updateTemplate('admin')
      }
    } else {
      store.updateTemplate('default')
      return navigateTo(`${authStore.routes.redirect}?r=${to.fullPath}`)
    }
  } else {
    store.updateTemplate('default')
    store.updatePreview({ state: false, refreshToken: config.public.WP_REFRESH_VALUE })
  }
})
