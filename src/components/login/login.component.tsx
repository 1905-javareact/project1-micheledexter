import React, { Component, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { RouteComponentProps } from 'react-router';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { login } from '../../actions/login.actions';
import { connect } from 'react-redux';

interface ILoginState {
  username: string;
  password: string;
  token: string | undefined;
}

interface ILoginProps extends RouteComponentProps {
  currentUser: User;
  message: string;
  login: (username: string, password: string, history: History) => void;
}

class Login extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: Cookies.get('token')
    }
  }

  private handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();

    if (this.validateForm()) {
      const loginSuccess: Response = await this.submitLogin();
      return loginSuccess;
    } else {
      alert('Please enter in a username and password.');
    }
  }

  private validateForm = (): boolean => {
    return (this.state.username !== '' || this.state.password !== '');
  }

  private submitLogin = async (): Promise<any> => {
    this.props.login(this.state.username, this.state.password, this.props.history);
    // let login = await fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'error',
    //   referrer: 'client',
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // });
    // let response: Promise<any> = new Promise<any>(()=>{});
    // try {
    //   response = await login.json();
    //   this.setState({user: response, token: Cookies.get('token')});
    //   this.props.history.push('barf');
    // } catch(e) {
    //   console.log('Invalid credentials');
    // }
  }

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: event.target.value
    });
  }

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="username" id="textUsername">Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            className="loginInput"
            onChange={this.onChangeUsername}
          />
          <br/>
          <label htmlFor="password" id="textPassword">Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            className="loginInput"
            onChange={this.onChangePassword}
          />
          <br/>
          <input
            type="submit"
            name="submit"
            value="Log In"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
    message: state.login.message
  }
};

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);