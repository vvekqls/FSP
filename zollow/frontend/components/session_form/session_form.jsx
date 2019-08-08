import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  renderErrors() {
    return (
      <ul className="session-errors-log">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  linkLogIn() {
    return (
      <div className='session-link-container'>
        <button href='#' className='session-button selected'>Sign in</button>
        {this.props.bothFormButton('signup', 'New Account')}
      </div>
    );
  }

  linkSignUp() {
    return (
      <div className='session-link-container'>
        {this.props.bothFormButton('login', 'Sign in')}
        <button href='#' className='session-button selected'>New Account</button>
      </div>
    );
  }

  guestLogin(e) {
    e.preventDefault();
    const guest = {
      email: 'd3song@asd',
      password: 'password'
    };

    this.props.loginGuest(guest).then(this.props.closeModal);
  }

  render() {
    let submitButton = 'Sign in';
    let formButtons = this.linkLogIn();
    let hasErrors = this.props.errors.length ? 'session-errors-input' : '';

    if (this.props.formType === 'signup') {
      submitButton = 'Submit';
      formButtons = this.linkSignUp();
    }

    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h2>Welcome to Yollow</h2>

          {formButtons}

          <div onClick={this.props.closeModal} className="close-x">x</div>
          <div className="login-form">
            <br />
            {this.renderErrors()}
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className={`login-input ${hasErrors}`}
              placeholder='Enter email'
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              className={`login-input ${hasErrors}`}
              placeholder='Enter password'
            />
            <br />
            <div className='submit-buttons'>
              <input className="session-submit" type="submit" value={submitButton} />
              <button onClick={this.guestLogin} className="session-submit">Guest</button>
            </div>
            <hr />

          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);

