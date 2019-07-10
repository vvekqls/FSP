import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin(e){
    e.preventDefault();
    let username = 'd3song'.split('')
    let password = 'password'.split('')
    let handle = setInterval(()=>{
      if (username.length > 0) {
        this.setState({
          username: this.state.username + username.shift()
        })
      } else {
        clearInterval(handle)
        handle = setInterval(() => {
          if (password.length > 0) {
            this.setState({
              password: this.state.password + password.shift()
            })
          } else {
            clearInterval(handle)
            this.props.processForm(this.state)
          }
        }, 50)
      }
    }, 50)
  }

  componentWillUnmount(){
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
    this.props.processForm(user);
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
          <br />
          <div className="session-button-container">
            <button className="session-button">{this.props.navSignin}</button>
            <button className="session-button">{this.props.navLink}</button>
            {/* <Link to="/login">Sign In</Link>  {this.props.navLink} */}
            {this.renderErrors()}
          </div>
         
          <div className="login-form">
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
            <div className="session-submit-container">
            <input className="session-submit" type="submit" value={this.props.formType} />
            <button className="session-submit" onClick={this.demoLogin}>Log In to the Demo</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
