/**
 * Unit tests for validators, src/validators.ts
 */

import {
  bodyContainsValidator,
  bodyRegexValidator,
  titleContainsValidator,
  titleRegexValidator
} from '../../src/validators'

const emptyConfig = {
  titleContains: null,
  titleRegex: null,
  bodyContains: null,
  bodyRegex: null
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
      const config = emptyConfig
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

describe('bodyContains', () => {
  describe('when bodyContains was not defined', () => {
    it('returns skipped validation result', () => {
      const config = { ...emptyConfig, titleRegex: null }
      const pullRequest = { title: 'test title', body: 'test body' }
      expect(bodyContainsValidator.validation(config, pullRequest)).toEqual({
        skipped: true
      })
    })
  })

  describe('when titleContains was defined', () => {
    describe('when it matches', () => {
      it('returns successful validation result', () => {
        const config = { ...emptyConfig, bodyContains: 'BBOODDYY' }
        const pullRequest = {
          title: 'abc-abb-12345',
          body: 'Long text\nwith newlines\n but contains BBOODDYY\n somewhere'
        }
        expect(bodyContainsValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: true,
          message: 'PR Body contains BBOODDYY'
        })
      })
    })

    describe('when it does not match', () => {
      describe('when body is empty', () => {
        it('returns failed validation result', () => {
          const config = { ...emptyConfig, bodyContains: 'BBOODDYY' }
          const pullRequest = { title: 'test title XYZ' }
          expect(bodyContainsValidator.validation(config, pullRequest)).toEqual({
            skipped: false,
            success: false,
            message: 'PR Body does not contain BBOODDYY'
          })
        })
      })

      describe('when body is not empty', () => {
        it('returns failed validation result', () => {
          const config = { ...emptyConfig, bodyContains: 'BBOODDYY' }
          const pullRequest = {
            title: 'test title XYZ',
            body: 'Long text\nwith newlines\n but does not contain B-B-O-ODD-YY\n somewhere'
          }
          expect(bodyContainsValidator.validation(config, pullRequest)).toEqual({
            skipped: false,
            success: false,
            message: 'PR Body does not contain BBOODDYY'
          })
        })
      })
    })
  })
})

describe('bodyRegexValidator', () => {
  describe('when bodyRegex was not defined', () => {
    it('returns skipped validation result', () => {
      const config = emptyConfig
      const pullRequest = { title: 'test title', body: 'test body' }
      expect(bodyRegexValidator.validation(config, pullRequest)).toEqual({
        skipped: true
      })
    })
  })

  describe('when bodyRegex was defined', () => {
    describe('when it matches', () => {
      it('returns successful validation result', () => {
        const config = { ...emptyConfig, bodyRegex: 'Ticket: XYZ-\\d+' }
        const pullRequest = {
          title: 'abc-abb-12345',
          body: 'Long text\nwith newlines\n but contains Ticket: XYZ-12345\n somewhere'
        }
        expect(bodyRegexValidator.validation(config, pullRequest)).toEqual({
          skipped: false,
          success: true,
          message: 'PR Body matches Ticket: XYZ-\\d+'
        })
      })
    })

    describe('when it does not match', () => {
      describe('when body is empty', () => {
        it('returns failed validation result', () => {
          const config = { ...emptyConfig, bodyRegex: 'Ticket: XYZ-\\d+' }
          const pullRequest = {
            title: 'abc-abb-12345'
          }
          expect(bodyRegexValidator.validation(config, pullRequest)).toEqual({
            skipped: false,
            success: false,
            message: 'PR Body does not match Ticket: XYZ-\\d+'
          })
        })
      })

      describe('when body is not empty', () => {
        it('returns failed validation result', () => {
          const config = { ...emptyConfig, bodyRegex: 'Ticket: XYZ-\\d+' }
          const pullRequest = {
            title: 'abc-abb-12345',
            body: 'Long text\nwith newlines\n but does not contain Ticket: UUU-12345\n somewhere'
          }
          expect(bodyRegexValidator.validation(config, pullRequest)).toEqual({
            skipped: false,
            success: false,
            message: 'PR Body does not match Ticket: XYZ-\\d+'
          })
        })
      })
    })
  })
})
