import { defineStore } from 'pinia'
import { State, Preview, Template, Header } from '~/types/store'

export default defineStore('use-store', {
  state: (): State => ({
    loaded: false,
    loading: false,
    preview: {
      state: false,
      refreshToken: 0,
    },
    header: {
      state: 'normal',
    },
    template: 'default',
  }),
  getters: {
    isLoaded(): boolean {
      return this.loaded
    },
    isLoading(): boolean {
      return this.loading
    },
  },
  actions: {
    updateLoading(value: boolean): void {
      this.loading = value
    },
    updateLoaded(value: boolean): void {
      this.loaded = value
    },
    updateHeader(value: Header): void {
      this.header.state = value.state
    },
    updatePreview(params: Preview): void {
      this.preview.state = params.state
      this.preview.refreshToken = params.refreshToken
    },
    updateTemplate(state: Template) {
      this.template = state
    },
  },
})
