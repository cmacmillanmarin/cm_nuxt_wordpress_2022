export type Target = 'production' | 'preview'

export type State = 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED'

export interface VercelDeployment {
  state: State
  target: Target
  createdAt: number
  buildingAt: number
  readyAt: number
  meta: {
    deployHookId?: string
  }
}

export interface VercelDeployments {
  pagination: {
    next: number | null
  }
  deployments: Array<VercelDeployment>
}

export interface Deployment {
  created: string
  state: State
  hook: boolean
}

export interface Deployments {
  pagination: boolean
  list: Array<Deployment>
}
