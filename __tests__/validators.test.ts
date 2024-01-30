/**
 * Unit tests for validators, src/validators.ts
 */

import { titleValidator } from '../src/validators'

describe('titleValidator', () => {
  describe('when titleContains was not defined', () => {
    it('returns skipped validation result', () => {
      const config = { titleContains: null }
      const pullRequest = { title: 'test title' }
      expect(titleValidator.validation(config, pullRequest)).toEqual({
        skipped: true
      })
    })
  })

  describe('when titleContains was defined', () => {
    describe('when it matches', () => {
      it('returns successful validation result', () => {
        const config = { titleContains: 'ABC' }
        const pullRequest = { title: 'test title ABC' }
        expect(titleValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: true,
          message: 'PR Title contains ABC'
        })
      })
    })

    describe('when it does not match', () => {
      it('returns failed validation result', () => {
        const config = { titleContains: 'ABC' }
        const pullRequest = { title: 'test title XYZ' }
        expect(titleValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: false,
          message: 'PR Title does not contain ABC'
        })
      })
    })
  })
})
