import React, { Component } from 'react';
import cookies from 'js-cookie';
import { apiClient } from '../../axios/user-api-client';

class Logout extends Component<any, any> {

  logMeOut = async() => {
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

export default Logout