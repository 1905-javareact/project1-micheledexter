import React, { Component } from 'react';
import cookies from 'js-cookie';

class Logout extends Component<any, any> {
  
  componentDidMount() {
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