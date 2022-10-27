import useStore from '~/store/useStore'
import useAuthStore from '~/store/useAuthStore'
import { Template } from '~/types/store'

export default defineNuxtRouteMiddleware(async to => {
  const store = useStore()
  const authStore = useAuthStore()
  const authToken = useCustomCookie('authToken')
  const config = useRuntimeConfig()

  // If isAuthenticated is false and authToken
  // cookie exists (only posible in first render)
  if (!authStore.isAuthenticated && authToken.value) {
    // Tries to validate the token, if valid, isAuthenticated will be true,
    // if not valid authToken cookie will be removed
    await authStore.validate(authToken.value)
  }

  const isDocs = to.fullPath.startsWith(`/docs`)
  const isPreview = to.fullPath.startsWith(`/preview`) || store.preview.state

  const requiresAuth = isDocs || isPreview

  if (requiresAuth) {
    if (authStore.isAuthenticated) {
      const template: Template = isDocs ? 'docs' : 'default'
      store.updateTemplate(template)
      if (isPreview) {
        store.updatePreview({ state: true, refreshToken: Date.now() })
      }
    } else {
      store.updateTemplate('default')
      const loggedRedirect = to.query.to ? to.query.to : to.fullPath
      return navigateTo(`${authStore.routes.redirect}?redirect=${loggedRedirect}`)
    }
  } else {
    store.updateTemplate('default')
    store.updatePreview({ state: false, refreshToken: config.public.WP_REFRESH_VALUE })
  }
})
