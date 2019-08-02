import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, removeErrors } from '../../actions/session_actions';
import SessionForm from './signup_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'signup',
    navLink: <Link to="/login">Sign In</Link>,
    navSignup: < Link to = "/signup" > New Account</Link >
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    removeErrors: () => dispatch(removeErrors()),
    bothFormButton: (type, text) => {
      return (
        <button href="#" className={`session-button`} onClick={() => dispatch(openModal(type))}>
          {text}
        </button>
      );
    },
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

