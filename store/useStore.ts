import { defineStore } from 'pinia'
import { State, Preview, Template, Header } from '~/types/store'

export default defineStore('use-store', {
  state: (): State => ({
    loaded: false,
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
    isLoaded() {
      return this.loaded
    },
  },
  actions: {
    updateLoaded(value: boolean): void {
      this.loaded = value
    },
    updateHeader(value: Header): void {
      this.header.state = value
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
