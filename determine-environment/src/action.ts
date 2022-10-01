import {components} from '@octokit/openapi-types'
import github from '@actions/github'

export function getRefName() {
  return process.env.GITHUB_REF_NAME
}

type RefType = 'branch' | 'tag' | undefined
export function getRefType(): RefType {
  return process.env.GITHUB_REF_TYPE as RefType
}

export async function getRepository(
  octokit: ReturnType<typeof github.getOctokit>
): Promise<components['schemas']['repository']> {
  const data = octokit.request('GET /repos/{owner}/{repo}', {
    ...github.context.repo
  })

  // the @vercel/ncc compiler does not want to automatically cast this above
  return data as unknown as components['schemas']['repository']
}
