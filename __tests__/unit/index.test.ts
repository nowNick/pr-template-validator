/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

import * as core from '@actions/core'
import * as main from '../../src/main'

// Mock the action's entrypoint
const executeActionMock = jest.spyOn(main, 'executeAction').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()

describe('index', () => {
  it('calls run when imported', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../src/index')

    expect(executeActionMock).toHaveBeenCalled()
  })

  describe('error handling', () => {
    it('records error', async () => {
      executeActionMock.mockImplementation(() => {
        throw new Error('Error from test mock')
      })

      // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      await require('../../src/index').run()

      expect(setFailedMock).toHaveBeenNthCalledWith(1, expect.stringMatching('Error from test mock'))
    })
  })
})
