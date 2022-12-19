// Add available templates
export type Template = 'default' | 'docs'

export interface Header {
  state: 'normal' | 'sticky' // Add available headers
}
export interface Preview {
  state: boolean
  refreshToken: number
}

export interface State {
  loaded: boolean
  loading: boolean
  preview: Preview
  header: Header
  template: Template
}
