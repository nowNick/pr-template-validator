/**
 * The entrypoint for the action.
 */
import * as core from '@actions/core'
import { executeAction } from './main'

export async function run(): Promise<void> {
  try {
    executeAction()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()
