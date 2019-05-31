import React, { Component } from 'react';
import Cookies from 'js-cookie';


class Landing extends Component<any, any> {
  
  render() {
    const token = Cookies.get('token');
    console.log(token);
    if (token) {
      this.props.history.push('test'); /* Keep this as a placeholder for once the login page is set up */
      // content = <Redirect to='/test' />
    } else {
      this.props.history.push('login');
      // content = <Redirect to='/login.do' />
    }
    return(
      <>
      </>
    )
  }
}

export default Landing;