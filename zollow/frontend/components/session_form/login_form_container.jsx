import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, removeErrors } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Sign in',
    navLink: <Link to="/signup">New Account</Link>,
    navSignin: <Link to="/login">Sign In</Link>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    removeErrors: () => dispatch(removeErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
