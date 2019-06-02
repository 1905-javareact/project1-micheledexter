import React, { Component, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { RouteComponentProps } from 'react-router';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { login } from '../../actions/login.actions';
import { connect } from 'react-redux';
import './login.component.css';

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
      <div className="Login">
        <div className="login-form">
          <form onSubmit={this.handleLogin}>
            <h2 className="text-center">Log in</h2>
            <div className="form-group">
              <input 
                type="text" 
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                className="form-control" 
                placeholder="Username" 
                required={true} />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                className="form-control" 
                placeholder="Password" 
                required={true} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Log in</button>
            </div>
          </form>
        </div>
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