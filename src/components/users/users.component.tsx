import React, { Component } from 'react';
import { User } from '../../models/user';
import { checkStatus } from '../../utilities/handle';
import { apiClient } from '../../axios/user-api-client';
import { History } from 'history';

interface IUsersProps {
  history: History
}
interface IUsersState {
  users: User[]
}

class Users extends Component<IUsersProps, IUsersState> {
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

  viewUser = (user: number) => {
    this.props.history.push('/dashboard/viewuser/' + user);
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
                  <td><input type="button" value="View" onClick={() => this.viewUser(user.userId)} /></td>
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

export default Users;