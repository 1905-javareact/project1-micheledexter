import React, { Component } from 'react';
import cookies from 'js-cookie';
import { apiClient } from '../../axios/user-api-client';
import { logout } from '../../actions/global.actions';
import { History } from 'history';
import { connect } from 'react-redux';

interface ILogoutProps {
  logout: () => void;
  history: History;
}

class Logout extends Component<ILogoutProps, any> {

  logMeOut = async() => {
    this.props.logout();
    await apiClient.post('/del');
  }
  
  componentDidMount() {
    this.logMeOut();
    cookies.remove('token', {path: '/'});
    this.props.history.push('login');
  }

  render() {
    return(
      <span>
        Logout successful
      </span>
    );
  }
}

const mapDispatchToProps = {
  logout: logout
}

export default connect(null, mapDispatchToProps)(Logout);