import NetlifyGraph from './netlifyGraph';
import { parse } from 'cookie';

export const handler = async (event) => {
  const [, , , username = 'jlengstorf'] = event.path.split('/');
  const cookies = parse(event.headers.cookie);
  const auth = JSON.parse(cookies['nf-gh-session']);

  const { errors: GitHubDataErrors, data: GitHubDataData } =
    await NetlifyGraph.fetchGitHubData({
      login: username,
      gitHubOAuthToken: auth.access_token,
    });

  if (GitHubDataErrors) {
    console.error(JSON.stringify(GitHubDataErrors, null, 2));
  }

  const user = GitHubDataData.gitHub.user;

  return {
    statusCode: 200,
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json',
    },
  };
};

/**
 * Client-side invocations:
 * Call your Netlify function from the browser (after saving
 * the code to `GitHubData.js`) with these helpers:
 */

/**
async function fetchGitHubData(oneGraphAuth, params) {
  const {} = params || {};
  const resp = await fetch(`/.netlify/functions/GitHubData`,
    {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        ...oneGraphAuth?.authHeaders()
      }
    });

    const text = await resp.text();

    return JSON.parse(text);
}
*/
