import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hasValidToken, setHasValidToken] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    async function checkLogin() {
      const { isLoggedIn, user } = await fetch('/auth/check').then((res) =>
        res.json(),
      );

      if (isLoggedIn) {
        setLoggedInUser(user);
        setHasValidToken(true);
      } else {
        setHasValidToken(false);
      }
    }

    checkLogin();
  }, []);

  async function loadProfile(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get('username');

    const userData = await fetch(`/api/user/${username}`).then((res) =>
      res.json(),
    );

    setUser(userData);
  }

  return (
    <div className="App">
      {hasValidToken && (
        <>
          {loggedInUser && (
            <div className="login-details">
              <img src={loggedInUser.avatar_url} alt={loggedInUser.login} />
              <p>logged in as @{loggedInUser.login}</p>
              <a href="/auth/logout">log out</a>
            </div>
          )}
          <h1>Look up an OSS contributor to thank!</h1>
          <p>
            <strong>NOTE:</strong> This only works for individuals. Searching
            for organizations won’t work.
          </p>
          <form className="lookup-form" onSubmit={loadProfile}>
            <label htmlFor="username">
              GitHub Username
              <input type="text" name="username" id="username" />
            </label>

            <button>Look Up</button>
          </form>

          {user && (
            <>
              <div className="user-info">
                <img src={user.avatarUrl} alt={user.name} />
                <h2>
                  Say thanks to {user.name} (@{user.login})
                </h2>
              </div>
              {!user.viewerIsSponsoring && user.viewerCanSponsor && (
                <p>
                  Want to show even more appreciation?{' '}
                  <a href={`https://github.com/sponsors/${user.login}`}>
                    Sponsor @{user.login} on GitHub
                  </a>
                  !
                </p>
              )}
              {user.viewerIsSponsoring && (
                <p>
                  You're{' '}
                  <a href={`https://github.com/sponsors/${user.login}`}>
                    sponsoring @{user.login} on GitHub
                  </a>
                  ! Thank you so much!
                </p>
              )}
            </>
          )}
        </>
      )}
      {hasValidToken === false && (
        <>
          <h1>Log In With GitHub</h1>
          <p>
            Log in with your GitHub account to send a Valentine to your favorite
            OSS contributors!
          </p>
          <p>
            <a className="App-link" href="/auth/login">
              Log In With GitHub
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
