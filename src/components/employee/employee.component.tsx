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
        <h2>Welcome, {this.props.currentUser.firstName} {this.props.currentUser.lastName}!</h2>
        <h3>Here is your current user information</h3>
        <code>Please note that we do not save your password in raw text for security purposes,</code><br />
        <code>so your password will not be viewable here. Thank you for understanding.</code>
        <table className="table">
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{this.props.currentUser.username}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td>{this.props.currentUser.firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{this.props.currentUser.lastName}</td>
            </tr>
            <tr>
              <td>Email Address:</td>
              <td>{this.props.currentUser.email}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>Employee</td>
            </tr>
          </tbody>
        </table>
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