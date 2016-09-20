import React, { PropTypes } from 'react';
import { signIn } from '../../actions/auth';
import './styles.css';

const LandingPage = ({ }) => {
  return <button onClick={signIn}>SignIn</button>;
};

LandingPage.propTypes = {
  account: PropTypes.shape({
    loggedIn: PropTypes.bool,
  }),
};

export default LandingPage;
