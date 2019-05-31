import React, { Component } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { User } from '../../models/user';
import { checkPermission } from '../../utilities/handle';

interface IUsersState {
  users: User[]
}

class Users extends Component<any, IUsersState> {
  constructor(props: any){
    super(props);
    this.state = {
      users: []
    }
  }
  
  getAllUsers = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/users',
      withCredentials: true
    }).then((response: AxiosResponse<User[]>) => {
      this.setState({
        users: response.data
      });
    }).catch((error: AxiosError) => {
      console.log(`Something went wrong: ${error.message}`);
      checkPermission(this.props, error);
    });
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    const {users} = this.state;
    return (
      <div>
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