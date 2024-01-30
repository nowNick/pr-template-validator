/**
 * Unit tests for pull request context wrapper, src/pull_request.ts
 */

import { context } from '@actions/github'
import { getPullRequestFromContext } from '../src/pull_request'

describe('getPullRequestFromContext', () => {
  describe('when run in pr context', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('build pull_request object', () => {
      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1,
          title: 'PR with XYZ required'
        }
      })

      const pr = getPullRequestFromContext()
      expect(pr).toEqual({
        title: 'PR with XYZ required'
      })
    })

    it('throws if pull_request object does not have title', () => {
      jest.replaceProperty(context, 'payload', {
        pull_request: {
          number: 1
        }
      })

      expect(() => {
        getPullRequestFromContext()
      }).toThrow('Pull request does not have a title!')
    })
  })

  describe('when run outiside of PR context', () => {
    it('throws error', () => {
      jest.replaceProperty(context, 'payload', {})

      expect(() => {
        getPullRequestFromContext()
      }).toThrow('The action does not run in pull request context!')
    })
  })
})
