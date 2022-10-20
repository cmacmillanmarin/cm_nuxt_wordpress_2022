import { defineStore } from 'pinia'
import { State, Token, TokenValidate, Login } from '~/types/auth/store'

export default defineStore('use-auth-store', {
  state: (): State => ({
    isAuthenticated: false,
    redir: '/admin',
    request: '',
  }),
  getters: {
    baseUrl() {
      const config = useRuntimeConfig()
      return config.public.WP_AUTH_API_BASE_URL
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
        this.isAuthenticated = true
        authToken.value = data.value.token
      }
    },

    logOut() {
      const authToken = useCustomCookie('authToken')
      this.isAuthenticated = false
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
        this.isAuthenticated = true
      }
    },

    updateRequest(value: string) {
      this.request = value
    },
  },
})
