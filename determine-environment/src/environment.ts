import {getRefName, getRefType, getRepo, getRepoOwner, getSha} from './action'
import {Octokit} from 'octokit'
import * as core from '@actions/core'

export async function isStagingBranch(defaultBranch: string): Promise<boolean> {
  core.info('Determining if staging branch...')

  if (getRefType() !== 'branch') {
    return false
  }

  core.info('Ref is of type: branch')

  if (getRefName() === defaultBranch) {
    core.info('Ref is equal to default branch')
    return true
  }

  core.info(
    `Ref is not equal to default branch: ${getRefName()} != ${defaultBranch}`
  )

  return false
}

export async function isProductionTag(
  octokit: Octokit,
  defaultBranch: string
): Promise<boolean> {
  if (getRefType() !== 'tag') {
    return false
  }

  const owner = getRepoOwner()
  const repo = getRepo()
  const sha = getSha()

  // Get timestamp of commit that tag is pointing to
  const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    sha,
    per_page: 1
  })
  const commitDate = commits.data[0]?.commit.committer?.date
  if (!commitDate) return false

  // Check all default branch for the existence of the tag sha
  // Commit timestamp is used to narrow results to only the tagged commit
  const branchCommits = await octokit.request(
    'GET /repos/{owner}/{repo}/commits',
    {
      owner,
      repo,
      sha: defaultBranch,
      since: commitDate,
      until: commitDate
    }
  )
  for (const commit of branchCommits.data) {
    if (commit.sha === sha) return true
  }

  return false
}
