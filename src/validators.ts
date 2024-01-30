import { Config } from './config'
import { PullRequest } from './pull_request'

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

export const validationRunner =
  (config: Config, pr: PullRequest, resultProcessor: ResultProcessor) => (validator: Validator) =>
    resultProcessor(validator.name, validator.validation(config, pr))

export const titleValidator: Validator = {
  name: 'TitleValidator',
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
