export type Target = 'production' | 'preview'

export type State = 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED'

export interface VercelDeployment {
  uid: string
  name: string
  url: string
  source: string
  type: string
  state: State
  target: Target
  created: number
  createdAt: number
  buildingAt: number
  readyAt: number
  ready: string
  inspectorUrl: string
  aliasError: string
  aliasAssigned: string
  isRollbackCandidate: string
  creator: {
    uid: string
    email: string
    username: string
    githubLogin: string
  }
  meta: {
    deployHookId?: string
    githubCommitAuthorName: string
    githubCommitMessage: string
    githubCommitOrg: string
    githubCommitRef: string
    githubCommitRepo: string
    githubCommitSha: string
    githubDeployment: string
    githubOrg: string
    githubRepo: string
    githubCommitRepoId: string
    githubRepoId: string
    githubCommitAuthorLogin: string
  }
}

export interface VercelDeployments {
  pagination: {
    next: number | null
  }
  deployments: Array<VercelDeployment>
}

export interface Deployment {
  title: string
  created: string
  state: State
  hook: boolean
}

export interface Deployments {
  pagination: boolean
  list: Array<Deployment>
}
