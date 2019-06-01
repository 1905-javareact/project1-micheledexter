import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';

interface IEmployeeProps {
  currentUser: User;
}

class Employee extends Component<IEmployeeProps, any> {
  render() {
    return (
      <div className="Employee">
        {this.props.currentUser.firstName}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  }
}

const mapDispatchToProps = {
  // imported dispatch props need to be mapped here
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);