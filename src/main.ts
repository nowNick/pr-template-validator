import * as core from '@actions/core'
import { buildConfigFromInput } from './config'
import { getPullRequestFromContext } from './pull_request'
import { ValidationResult, titleValidator, validationRunner } from './validators'

const processResult = (validatorName: string, result: ValidationResult) => {
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

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const config = buildConfigFromInput()
    const pr = getPullRequestFromContext()
    const runValidation = validationRunner(config, pr, processResult)

    const validators = [titleValidator]

    validators.forEach(runValidation)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
