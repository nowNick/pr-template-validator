/**
 * Unit tests for validators, src/validators.ts
 */

import { titleContainsValidator, titleRegexValidator } from '../../src/validators'

const emptyConfig = {
  titleContains: null,
  titleRegex: null
}

describe('titleValidator', () => {
  describe('when titleContains was not defined', () => {
    it('returns skipped validation result', () => {
      const config = emptyConfig
      const pullRequest = { title: 'test title' }
      expect(titleContainsValidator.validation(config, pullRequest)).toEqual({
        skipped: true
      })
    })
  })

  describe('when titleContains was defined', () => {
    describe('when it matches', () => {
      it('returns successful validation result', () => {
        const config = { ...emptyConfig, titleContains: 'ABC' }
        const pullRequest = { title: 'test title ABC' }
        expect(titleContainsValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: true,
          message: 'PR Title contains ABC'
        })
      })
    })

    describe('when it does not match', () => {
      it('returns failed validation result', () => {
        const config = { ...emptyConfig, titleContains: 'ABC' }
        const pullRequest = { title: 'test title XYZ' }
        expect(titleContainsValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: false,
          message: 'PR Title does not contain ABC'
        })
      })
    })
  })
})

describe('titleRegex', () => {
  describe('when titleRegex was not defined', () => {
    it('returns skipped validation result', () => {
      const config = { ...emptyConfig, titleRegex: null }
      const pullRequest = { title: 'test title' }
      expect(titleRegexValidator.validation(config, pullRequest)).toEqual({
        skipped: true
      })
    })
  })

  describe('when titleContains was defined', () => {
    describe('when it matches', () => {
      it('returns successful validation result', () => {
        const config = { ...emptyConfig, titleRegex: '^abc-[ab]{3}-.....$' }
        const pullRequest = { title: 'abc-abb-12345' }
        expect(titleRegexValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: true,
          message: 'PR Title matches ^abc-[ab]{3}-.....$'
        })
      })
    })

    describe('when it does not match', () => {
      it('returns failed validation result', () => {
        const config = { ...emptyConfig, titleRegex: '^abc-[ab]{3}-.....$' }
        const pullRequest = { title: 'test title XYZ' }
        expect(titleRegexValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: false,
          message: 'PR Title does not match ^abc-[ab]{3}-.....$'
        })
      })
    })
  })
})
