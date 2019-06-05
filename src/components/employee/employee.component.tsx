import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { FullReimbursement } from '../../models/reimbursement';
import './employee.component.css';

interface IEmployeeProps {
  currentUser: User;
}

interface IEmployeeState{
  reimbursements: FullReimbursement[]
}

class Employee extends Component<IEmployeeProps, IEmployeeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: []
    }
  }

  render() {
    return (
      <div className="Employee">
        <h2>Welcome, {this.props.currentUser.firstName} {this.props.currentUser.lastName}!</h2>
        <h3>Here is your current user information</h3>
        <code>Please note that we do not save your password in raw text for security purposes,</code><br />
        <code>so your password will not be viewable here. Thank you for understanding.</code>
        <div className="container">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td><b>Username:</b></td>
                <td>{this.props.currentUser.username}</td>
              </tr>
              <tr>
                <td><b>First Name:</b></td>
                <td>{this.props.currentUser.firstName}</td>
              </tr>
              <tr>
                <td><b>Last Name:</b></td>
                <td>{this.props.currentUser.lastName}</td>
              </tr>
              <tr>
                <td><b>Email Address:</b></td>
                <td>{this.props.currentUser.email}</td>
              </tr>
              <tr>
                <td><b>Role:</b></td>
                <td>{this.props.currentUser.role.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
  }
}

export default connect(mapStateToProps)(Employee);