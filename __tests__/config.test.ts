/**
 * Unit tests for config wrapper, src/config.ts
 */

import { buildConfigFromInput } from '../src/config'

describe('buildConfigFromInput', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('succeeds if PR title contains text', () => {
    jest.replaceProperty(process, 'env', { ['INPUT_TITLE-CONTAINS']: 'ABC' })

    const config = buildConfigFromInput()

    expect(config).toEqual({
      titleContains: 'ABC'
    })
  })
})
