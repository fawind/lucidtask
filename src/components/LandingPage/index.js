import React, { PropTypes } from 'react';
import { signIn, signOut } from '../../actions/auth';
import './styles.css';

const LandingPage = ({ account }) => {
  let googleButton = <button className="loginButton" onClick={signIn}>Sign in with Google</button>;
  if (account.loggedIn) {
    googleButton = <button className="loginButton" onClick={signOut}>Sign out</button>;
  }
  return (
    <div>
      <div className="landingPage">
        <p>
          <a className="title">
            LucidTask
          </a>
        </p>
        <p>
          Welcome to LucidTask, your minimal todo list.<br />
          In order to sync your tasks to the cloud,
          LucidTask requires access to your Google Tasks account.
        </p>
        <p>
          {googleButton}
        </p>
      </div>
      <div className="footer">
        <p>
          Feel free to check out the project on <a href="https://github.com/fawind/lucidtask/" target="_blank" alt="Github">Github</a>.
          Feedback and issues are <a href="https://github.com/fawind/lucidtask/issues/" target="_blank" alt="Github issues">always welcome</a>!
        </p>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  account: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }),
};

export default LandingPage;
