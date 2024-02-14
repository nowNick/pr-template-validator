/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import { context } from '@actions/github'
import * as main from '../../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'executeAction')

// Mock the GitHub Actions core library
let errorMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
let debugMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
  })

  describe('title contains check', () => {
    // TODO: change to afterEach
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('succeeds if PR title contains text', () => {
      const expectedTitleElement = 'XYZ'

      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR with XYZ required'
        }
      })
      jest.replaceProperty(process, 'env', { ['INPUT_TITLE-CONTAINS']: expectedTitleElement })

      main.executeAction()

      expect(runMock).toHaveReturned()
      expect(debugMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(`TitleContainsValidator ✅ --- succeeded with: PR Title contains ${expectedTitleElement}`)
      )
      expect(errorMock).not.toHaveBeenCalled()
    })

    it('fails if PR title does not contain text', () => {
      const expectedTitleElement = 'ABC'

      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR with -XYZ- required'
        }
      })
      jest.replaceProperty(process, 'env', { ['INPUT_TITLE-CONTAINS']: expectedTitleElement })

      main.executeAction()

      expect(runMock).toHaveReturned()
      expect(setFailedMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(
          `TitleContainsValidator ❌ --- failed with: PR Title does not contain ${expectedTitleElement}`
        )
      )
      expect(errorMock).not.toHaveBeenCalled()
    })

    it('skips if not configured to check PR title', () => {
      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR with -XYZ- required'
        }
      })
      jest.replaceProperty(process, 'env', {})

      main.executeAction()

      expect(runMock).toHaveReturned()
      expect(debugMock).toHaveBeenNthCalledWith(1, expect.stringMatching(`TitleContainsValidator: skipped`))
      expect(errorMock).not.toHaveBeenCalled()
    })
  })

  describe('title regex check', () => {
    // TODO: change to afterEach
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('succeeds if PR title matches regex', () => {
      const expectedTitleRegex = 'XYZ-[0-9]+'

      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR with XYZ-123 required'
        }
      })
      jest.replaceProperty(process, 'env', { ['INPUT_TITLE-REGEX']: expectedTitleRegex })

      main.executeAction()

      expect(debugMock).toHaveBeenNthCalledWith(2, expect.stringMatching(`TitleRegexValidator ✅ --- succeeded with`))
      expect(errorMock).not.toHaveBeenCalled()
    })
  })

  describe('body contains check', () => {
    // TODO: change to afterEach
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('succeeds if PR body contains text', () => {
      const expectedBodyElement = 'BBODYY'

      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR test title',
          body: '### Summary\ntest\n### Description\nSome test desc with BBODYY\n### End\nfinal lines'
        }
      })
      jest.replaceProperty(process, 'env', { ['INPUT_BODY-CONTAINS']: expectedBodyElement })

      main.executeAction()

      expect(debugMock).toHaveBeenNthCalledWith(
        3,
        expect.stringMatching(`BodyContainsValidator ✅ --- succeeded with: PR Body contains ${expectedBodyElement}`)
      )
      expect(errorMock).not.toHaveBeenCalled()
    })
  })

  describe('body regex check', () => {
    // TODO: change to afterEach
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('succeeds if PR body matches regex', () => {
      const expectedBodyRegex = 'XYZ-[0-9]+'

      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR test title',
          body: '### Summary\ntest\n### Description\nSome test desc with XYZ-01234\n### End\nfinal lines'
        }
      })
      jest.replaceProperty(process, 'env', { ['INPUT_BODY-REGEX']: expectedBodyRegex })

      main.executeAction()

      expect(debugMock).toHaveBeenNthCalledWith(
        4,
        expect.stringMatching(`BodyRegexValidator ✅ --- succeeded with: PR Body matches`)
      )
      expect(errorMock).not.toHaveBeenCalled()
    })
  })
})
