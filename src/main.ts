import * as core from '@actions/core'
import { buildConfigFromInput } from './config'
import { getPullRequestFromContext } from './pull-request'
import {
  ValidationResult,
  bodyContainsValidator,
  bodyRegexValidator,
  titleContainsValidator,
  titleRegexValidator,
  validationRunner
} from './validators'

const processResult = (validatorName: string, result: ValidationResult): void => {
  if (result.skipped) {
    core.debug(`${validatorName}: skipped`)
  } else {
    if (result.success) {
      core.debug(`${validatorName} ✅ --- succeeded with: ${result.message}`)
    } else {
      core.setFailed(`${validatorName} ❌ --- failed with: ${result.message}`)
    }
  }
}

export const executeAction = (): void => {
  const config = buildConfigFromInput()
  const pr = getPullRequestFromContext()
  const runValidation = validationRunner(config, pr, processResult)

  const validators = [titleContainsValidator, titleRegexValidator, bodyContainsValidator, bodyRegexValidator]

  validators.forEach(runValidation)
}
