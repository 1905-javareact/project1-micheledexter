import React, { Component } from 'react';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { checkUserPermission } from '../../utilities/handle';

interface IUsersAdminProps {
  history: History;
  users: User[];
  currentUser: User;
}

class UsersAdmin extends Component<IUsersAdminProps, any> {

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin']);
  }

  editUser = (user: number) => {
    this.props.history.push('/dashboard/edituser/' + user);
  }

  render() {
    return (
      <div className='AllUsers'>
        <h1>List of all users and their data</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => {
              return (
                <tr key={'user-' + user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role.role}</td>
                  <td><input type="button" value="Edit" onClick={() => this.editUser(user.userId)} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {}
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    users: state.user.users,
    currentUser: state.login.currentUser
  }
}

export default connect(mapStateToProps)(UsersAdmin);