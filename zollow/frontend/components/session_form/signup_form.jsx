import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      close: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeShow() {
    this.setState({ close: true });
  }

  componentWillUnmount() {
    this.props.removeErrors();
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

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h2>Welcome to Yollow!</h2>
          <br/>
          <div onClick={this.props.closeModal} className="close-x">x</div>
          <div className="session-button-container">
            <button className="session-button">{this.props.navLink}</button>
            <button className="session-button">{this.props.navSignup}</button>
            
            {this.renderErrors()}
          </div>
      
          <div className="login-form">
            <br />
              <input type="text"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            <br />
              <input type="text"
                value={this.state.username}
                placeholder="Enter Username"
                onChange={this.update('username')}
                className="login-input"
              />
            <br />
              <input type="password"
                value={this.state.password}
                placeholder="Enter Password"
                onChange={this.update('password')}
                className="login-input"
              />
    
            <br />
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpForm);