export default defineNuxtRouteMiddleware((to, from) => {
  const { lang } = to.params
  const admin = to.fullPath.includes('/admin')
  if (!lang && !admin) return navigateTo('/en')
})
