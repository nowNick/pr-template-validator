/**
 * Unit tests for config wrapper, src/config.ts
 */

import { buildConfigFromInput } from '../../src/config'

describe('buildConfigFromInput', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('reads titleContains from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_TITLE-CONTAINS']: 'ABC' })

    const config = buildConfigFromInput()

    expect(config).toEqual({
      titleContains: 'ABC',
      titleRegex: null,
      bodyContains: null,
      bodyRegex: null
    })
  })

  it('reads titleMatchesRegex from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_TITLE-REGEX']: '^[a-z]{3}.*$' })

    const config = buildConfigFromInput()

    expect(config).toEqual({
      titleContains: null,
      titleRegex: '^[a-z]{3}.*$',
      bodyContains: null,
      bodyRegex: null
    })
  })

  it('reads bodyContains from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_BODY-CONTAINS']: 'BBOODDYY' })

    const config = buildConfigFromInput()

    expect(config).toEqual({
      titleContains: null,
      titleRegex: null,
      bodyContains: 'BBOODDYY',
      bodyRegex: null
    })
  })

  it('reads bodyRegex from action input', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_BODY-REGEX']: 'XYZ-\\d+' })

    const config = buildConfigFromInput()

    expect(config).toEqual({
      titleContains: null,
      titleRegex: null,
      bodyContains: null,
      bodyRegex: 'XYZ-\\d+'
    })
  })
})
