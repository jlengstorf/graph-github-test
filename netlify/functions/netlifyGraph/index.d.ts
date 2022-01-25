// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!
/**
 * An empty mutation to start from
 */
export function executeExampleMutation (
  variables: {},
  accessToken?: string
): Promise<
  {/**
  * Any data retrieved by the function will be returned here
  */
  "data": {
        /**
  * Internal GraphQL field
  */
  "__typename": any
    }, /**
  * Any errors in the function will be returned here
  */
  "errors": Array<any>}
>;

/**
 * An example query to start with.
 */
export function fetchGitHubData(
  variables: {"gitHubOAuthToken": string, "login": string},
  accessToken?: string
): Promise<
  {/**
  * Any data retrieved by the function will be returned here
  */
  "data": {
        "gitHub": {
        /**
  * Lookup a user by login.
  */
  "user": {
        /**
  * The username used to login.
  */
  "login": string, /**
  * The user's public profile name.
  */
  "name": string, /**
  * A URL pointing to the user's public avatar.
  */
  "avatarUrl": any, /**
  * Whether or not the viewer is able to sponsor this user/organization.
  */
  "viewerCanSponsor": boolean, /**
  * True if the viewer is sponsoring this user/organization.
  */
  "viewerIsSponsoring": boolean, /**
  * True if the viewer is sponsored by this user/organization.
  */
  "isSponsoringViewer": boolean
    }
    }
    }, /**
  * Any errors in the function will be returned here
  */
  "errors": Array<any>}
>;
