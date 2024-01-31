import { Config } from './config'
import { PullRequest } from './pull-request'

export interface SkippedValidation {
  skipped: true
}

export interface ExecutedValidation {
  success: boolean
  skipped: false
  message: string
}

export type ValidationResult = SkippedValidation | ExecutedValidation
type ResultProcessor = (validatorName: string, result: ValidationResult) => void

export interface Validator {
  name: string
  validation: (c: Config, p: PullRequest) => ValidationResult
}

//prettier-ignore
export const validationRunner =
  (config: Config, pr: PullRequest, resultProcessor: ResultProcessor) =>
    (validator: Validator) =>
      resultProcessor(validator.name, validator.validation(config, pr))

export const titleContainsValidator: Validator = {
  name: 'TitleContainsValidator',
  validation: (config: Config, pullRequest: PullRequest): ValidationResult => {
    if (config.titleContains === null) {
      return {
        skipped: true
      }
    }

    if (pullRequest.title.includes(config.titleContains)) {
      return {
        success: true,
        skipped: false,
        message: `PR Title contains ${config.titleContains}`
      }
    }

    return {
      success: false,
      skipped: false,
      message: `PR Title does not contain ${config.titleContains}`
    }
  }
}

export const titleRegexValidator: Validator = {
  name: 'TitleRegexValidator',
  validation: (config: Config, pullRequest: PullRequest): ValidationResult => {
    if (config.titleRegex === null) {
      return {
        skipped: true
      }
    } else {
      if (pullRequest.title.match(config.titleRegex)) {
        return {
          success: true,
          skipped: false,
          message: `PR Title matches ${config.titleRegex}`
        }
      }

      return {
        success: false,
        skipped: false,
        message: `PR Title does not match ${config.titleRegex}`
      }
    }
  }
}

export const bodyContainsValidator: Validator = {
  name: 'BodyContainsValidator',
  validation: (config: Config, pullRequest: PullRequest): ValidationResult => {
    if (config.bodyContains === null) {
      return {
        skipped: true
      }
    } else {
      if (pullRequest.body && pullRequest.body.includes(config.bodyContains)) {
        return {
          success: true,
          skipped: false,
          message: `PR Body contains ${config.bodyContains}`
        }
      }

      return {
        success: false,
        skipped: false,
        message: `PR Body does not contain ${config.bodyContains}`
      }
    }
  }
}
