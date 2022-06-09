import { Octokit } from '@octokit/core'
import axios from 'axios'
const octokit = new Octokit()

export const getReadme = async (owner, repo) => {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner: owner,
      repo: repo
    })
    const data = response.data
    const readmeRep = await axios.get(data.download_url)
    return { hasReadme: true, readme: data.download_url, readmeString: readmeRep.data }
  } catch (error) {
    return { hasReadme: false }
  }
}
