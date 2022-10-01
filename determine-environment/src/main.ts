import * as core from '@actions/core'
import github from '@actions/github'
import {isProductionTag, isStagingBranch} from './environment'
import {getRepository} from './action'

const environment = 'environment'

async function run(): Promise<void> {
  core.setOutput(environment, 'development')
  if (github.context.eventName !== 'push') {
    return
  }

  const token = core.getInput('token')
  const octokit = github.getOctokit(token)
  const repository = await getRepository(octokit)

  if (await isStagingBranch(repository.default_branch)) {
    core.setOutput(environment, 'staging')
    return
  }

  if (await isProductionTag(octokit, repository.default_branch)) {
    core.setOutput(environment, 'production')
  }
}

run()
