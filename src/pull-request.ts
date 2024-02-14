import { context } from '@actions/github'

export interface PullRequest {
  title: string
  body?: string
}

export const getPullRequestFromContext = (): PullRequest => {
  if (!context.payload.pull_request) {
    throw new Error('The action does not run in pull request context!')
  }

  const title = context.payload.pull_request.title
  const body = context.payload.pull_request.body

  if (!title) {
    throw new Error('Pull request does not have a title!')
  }

  return {
    title,
    body
  }
}
