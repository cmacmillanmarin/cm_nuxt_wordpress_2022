import { defineStore } from 'pinia'
import { State, Preview, Template, Header } from '~/types/store'

export default defineStore('use-store', {
  state: (): State => ({
    preview: {
      state: false,
      refreshToken: 0,
    },
    header: {
      state: 'normal',
    },
    template: 'default',
  }),
  actions: {
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
