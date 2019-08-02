import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, removeErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Log In',
    navLink: <Link to="/signup">New Account</Link>,
    navSignin: <Link to="/login">Sign In</Link>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    removeErrors: () => dispatch(removeErrors()),
    bothFormButton: (type, text) => {
      return (
        <button href="#" className='session-button' onClick={() => dispatch(openModal(type))}>
          {text}
        </button>
      );
    },
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
