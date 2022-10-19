import useAuthStore from '~/store/useAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const token = useCustomCookie('token')

  if (!authStore.isAuthenticated && token.value) {
    await authStore.validate(token.value)
  }

  if (!authStore.isAuthenticated && to.fullPath !== authStore.redir) {
    return navigateTo(authStore.redir)
  }
})
