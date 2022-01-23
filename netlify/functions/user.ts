import { Handler } from '@netlify/functions';
import { parse } from 'cookie';
import { graphql } from '@octokit/graphql';

export const handler: Handler = async (event) => {
  const [, , , username = 'netlify'] = event.path.split('/');
  const cookies = parse(event.headers.cookie);
  const auth = JSON.parse(cookies['nf-gh-session']);

  const { user } = await graphql(
    `
      query ($login: String!) {
        user(login: $login) {
          login
          name
          avatarUrl
          viewerCanSponsor
          viewerIsSponsoring
          isSponsoringViewer
        }
      }
    `,
    {
      login: username,
      headers: {
        Authorization: `token ${auth.access_token}`,
      },
    },
  );

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };
};
