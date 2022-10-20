// Add available templates
export type Template = 'default' | 'admin'

export interface Header {
  state: 'normal' | 'sticky' // Add available headers
}
export interface Preview {
  state: boolean
  refreshToken: number
}

export interface State {
  preview: Preview
  header: Header
  template: Template
}
