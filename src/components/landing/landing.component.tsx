import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface ILandingProps {
  currentUser: User;
  history: History;
}

class Landing extends Component<ILandingProps, any> {

  componentDidMount() {
    const token = Cookies.get('token');
    if (token) {
      this.props.history.push('/dashboard/' + this.props.currentUser.role.role); /* Keep this as a placeholder for once the login page is set up */
      // content = <Redirect to='/test' />
    } else {
      this.props.history.push('/login');
      // content = <Redirect to='/login.do' />
    }
  }
  
  render() {
    return(
      <>
      </>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  }
}

export default connect(mapStateToProps)(Landing);