import { Config } from './config'
import { PullRequest } from './pull-request'

export interface ValidationResult {
  success?: boolean
  skipped?: boolean
  message?: string
}

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
    if (!config.titleContains) {
      return {
        skipped: true
      }
    }

    if (pullRequest.title.includes(config.titleContains)) {
      return {
        success: true,
        message: `PR Title contains ${config.titleContains}`
      }
    }

    return {
      message: `PR Title does not contain ${config.titleContains}`
    }
  }
}

export const titleRegexValidator: Validator = {
  name: 'TitleRegexValidator',
  validation: (config: Config, pullRequest: PullRequest): ValidationResult => {
    if (!config.titleRegex) {
      return {
        skipped: true
      }
    } else {
      if (pullRequest.title.match(config.titleRegex)) {
        return {
          success: true,
          message: `PR Title matches ${config.titleRegex}`
        }
      }

      return {
        message: `PR Title does not match ${config.titleRegex}`
      }
    }
  }
}

export const bodyContainsValidator: Validator = {
  name: 'BodyContainsValidator',
  validation: (config: Config, pullRequest: PullRequest): ValidationResult => {
    if (!config.bodyContains) {
      return {
        skipped: true
      }
    } else {
      if (pullRequest?.body?.includes(config.bodyContains)) {
        return {
          success: true,
          message: `PR Body contains ${config.bodyContains}`
        }
      }

      return {
        message: `PR Body does not contain ${config.bodyContains}`
      }
    }
  }
}

export const bodyRegexValidator: Validator = {
  name: 'BodyRegexValidator',
  validation: (config: Config, pullRequest: PullRequest): ValidationResult => {
    if (!config.bodyRegex) {
      return {
        skipped: true
      }
    } else {
      if (pullRequest?.body?.match(config.bodyRegex)) {
        return {
          success: true,
          message: `PR Body matches ${config.bodyRegex}`
        }
      }

      return {
        message: `PR Body does not match ${config.bodyRegex}`
      }
    }
  }
}
