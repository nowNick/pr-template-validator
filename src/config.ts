import * as core from '@actions/core'

export interface Config {
  titleContains: string | null
}

export const buildConfigFromInput = (): Config => {
  const inputTitleContains = core.getInput('title-contains')

  return {
    titleContains: inputTitleContains === '' ? null : inputTitleContains
  }
}
