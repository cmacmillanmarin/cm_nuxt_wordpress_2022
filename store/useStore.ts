import { defineStore } from 'pinia'
import { State, Header } from '~/types/store'

export default defineStore('use-store', {
  state: (): State => ({
    header: 'normal',
  }),
  getters: {
    headerState(): Header {
      return this.header
    },
  },
  actions: {
    setHeaderState(value: Header): void {
      this.header = value
    },
  },
})
