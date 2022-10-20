import useAuthStore from '~/store/useAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const authToken = useCustomCookie('authToken')

  if (!authStore.isAuthenticated && authToken.value) {
    await authStore.validate(authToken.value)
  }

  if (!authStore.isAuthenticated && to.fullPath !== authStore.redir) {
    return navigateTo(authStore.redir)
  }
})
