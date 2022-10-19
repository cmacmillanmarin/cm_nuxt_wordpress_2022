export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()
  console.log('hello from auth middleware ~ state ->', isLoggedIn.value)
  if (!isLoggedIn.value) return navigateTo('/admin')
})
