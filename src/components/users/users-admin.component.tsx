import React, { Component } from 'react';
import { User } from '../../models/user';
import { checkStatus } from '../../utilities/handle';
import { apiClient } from '../../axios/user-api-client';
import { History } from 'history';

interface IUsersAdminProps {
  history: History
}

interface IUsersAdminState {
  users: User[]
}

class UsersAdmin extends Component<IUsersAdminProps, IUsersAdminState> {
  constructor(props: any){
    super(props);
    this.state = {
      users: []
    }
  }

  getAllUsers = async () => {
    try {
      const response = await apiClient('/users');
      checkStatus(response.status, this.props.history);
      this.setState({
        users: response.data
      });
    } catch(e) {
      console.log(e);
    }
  }

  editUser = (user: number) => {
    this.props.history.push('/dashboard/edituser/' + user);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    const {users} = this.state;
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
            {users.map((user) => {
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

export default UsersAdmin;