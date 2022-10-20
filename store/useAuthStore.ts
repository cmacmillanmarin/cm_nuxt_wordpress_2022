import { defineStore } from 'pinia'
import { State, Token, TokenValidate, Login } from '~/types/wordpress/auth'

export default defineStore('use-auth-store', {
  state: (): State => ({
    auth: false,
    redir: '/admin',
  }),
  getters: {
    baseUrl() {
      const config = useRuntimeConfig()
      return config.public.WP_AUTH_API_BASE_URL
    },
    isAuthenticated() {
      return this.auth
    },
  },
  actions: {
    async logIn(params: Login) {
      const authToken = useCustomCookie('authToken')

      const { data } = await useFetch<Token>(`${this.baseUrl}/token`, {
        method: 'POST',
        initialCache: false,
        body: { username: params.username, password: params.password },
      })

      if (data.value?.token) {
        this.auth = true
        authToken.value = data.value.token
      }
    },
    logOut() {
      const authToken = useCustomCookie('authToken')
      this.auth = false
      authToken.value = undefined
    },
    async validate(token: string | number | undefined) {
      const { data } = await useFetch<TokenValidate>(`${this.baseUrl}/token/validate`, {
        method: 'POST',
        initialCache: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.value?.code === 'jwt_auth_valid_token') {
        this.auth = true
      }
    },
  },
})
