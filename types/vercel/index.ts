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
  ready: number
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
  id: string
  title: string
  created: number
  date: string
  time: number
  state: State
  hook: boolean
}

export interface Deployments {
  pagination: boolean
  list: Array<Deployment>
}

export interface VercelDeploy {
  job: {
    id: string
    state: string
    createdAt: number
  }
}

export interface Deploy {
  success: boolean
}

export interface VercelDeploymentBuild {
  builds: {
    id: string
    deploymentId: string
    entrypoint: string
    readyState:
      | 'BUILDING'
      | 'ERROR'
      | 'INITIALIZING'
      | 'QUEUED'
      | 'READY'
      | 'CANCELED'
      | 'UPLOADING'
      | 'DEPLOYING'
      | 'ARCHIVED'
    readyStateAt?: number
    scheduledAt?: number | null
    createdAt?: number
    deployedAt?: number
    createdIn?: string
    use?: string
    config?: {
      distDir?: string
      forceBuildIn?: string
      reuseWorkPathFrom?: string
      zeroConfig?: boolean
    }
    output: {
      type?: 'lambda' | 'file' | 'edge'
      path: string
      digest: string
      mode: number
      size?: number
      lambda?: {
        functionName: string
        deployedTo: string[]
        memorySize?: number
        timeout?: number
        layers?: string[]
      } | null
      edge?: {
        regions: string[] | null
      } | null
    }[]
    fingerprint?: string | null
    copiedFrom?: string
  }[]
}

export type BuildType =
  | 'BUILDING'
  | 'ERROR'
  | 'INITIALIZING'
  | 'QUEUED'
  | 'READY'
  | 'CANCELED'
  | 'UPLOADING'
  | 'DEPLOYING'
  | 'ARCHIVED'

export interface DeploymentBuild {
  state: BuildType
  time: number
}
