export interface Token {
  token: string
  user_email: string
  user_nicename: string
  user_display_name: string
}

export interface TokenValidate {
  code: string
}

export interface Login {
  username: string
  password: string
}

export interface State {
  isAuthenticated: boolean
  redir: string
  request: string
}
