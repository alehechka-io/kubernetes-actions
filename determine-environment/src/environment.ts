import github from '@actions/github'
import {getRefName, getRefType} from './action'

export async function isStagingBranch(defaultBranch: string): Promise<boolean> {
  if (getRefType() !== 'branch') {
    return false
  }

  if (getRefName() === defaultBranch) {
    return true
  }

  return false
}

export async function isProductionTag(
  octokit: ReturnType<typeof github.getOctokit>,
  defaultBranch: string
): Promise<boolean> {
  if (getRefType() !== 'tag') {
    return false
  }

  const sha = github.context.sha

  // Get timestamp of commit that tag is pointing to
  const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    ...github.context.repo,
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
      ...github.context.repo,
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
