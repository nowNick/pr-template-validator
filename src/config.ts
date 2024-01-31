import * as core from '@actions/core'

export interface Config {
  titleContains: string | null
  titleRegex: string | null
  bodyContains: string | null
}

const nullOr = (v: string): string | null => (v === '' ? null : v)

export const buildConfigFromInput = (): Config => {
  const inputTitleContains = core.getInput('title-contains')
  const inputTitleRegex = core.getInput('title-regex')
  const inputBodyContains = core.getInput('body-contains')

  return {
    titleContains: nullOr(inputTitleContains),
    titleRegex: nullOr(inputTitleRegex),
    bodyContains: nullOr(inputBodyContains)
  }
}
