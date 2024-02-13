/**
 * Unit tests for config wrapper, src/config.ts
 */

import { buildConfigFromInput } from '../../src/config'

describe('buildConfigFromInput', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('reads empty action input', () => {
    const config = buildConfigFromInput()
    expect(config).toEqual({
      titleContains: '',
      titleRegex: '',
      bodyContains: '',
      bodyRegex: ''
    })
  })

  it('reads titleContains from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_TITLE-CONTAINS']: 'ABC' })

    const config = buildConfigFromInput()

    expect(config).toMatchObject({
      titleContains: 'ABC'
    })
  })

  it('reads titleMatchesRegex from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_TITLE-REGEX']: '^[a-z]{3}.*$' })

    const config = buildConfigFromInput()

    expect(config).toMatchObject({
      titleRegex: '^[a-z]{3}.*$'
    })
  })

  it('reads bodyContains from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_BODY-CONTAINS']: 'BBOODDYY' })

    const config = buildConfigFromInput()

    expect(config).toMatchObject({
      bodyContains: 'BBOODDYY'
    })
  })

  it('reads bodyRegex from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_BODY-REGEX']: 'XYZ-\\d+' })

    const config = buildConfigFromInput()

    expect(config).toMatchObject({
      bodyRegex: 'XYZ-\\d+'
    })
  })
})
