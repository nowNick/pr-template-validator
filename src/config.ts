import * as core from '@actions/core'

export interface Config {
  titleContains?: string
  titleRegex?: string
  bodyContains?: string
  bodyRegex?: string
}

export const buildConfigFromInput = (): Config => ({
  titleContains: core.getInput('title-contains'),
  titleRegex: core.getInput('title-regex'),
  bodyContains: core.getInput('body-contains'),
  bodyRegex: core.getInput('body-regex')
})
