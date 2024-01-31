import * as core from '@actions/core'

export interface Config {
  titleContains: string | null
  titleRegex: string | null
}

const nullOr = (v: string) => (v === '' ? null : v)

export const buildConfigFromInput = (): Config => {
  const inputTitleContains = core.getInput('title-contains')
  const inputTitleRegex = core.getInput('title-regex')

  return {
    titleContains: nullOr(inputTitleContains),
    titleRegex: nullOr(inputTitleRegex)
  }
}
