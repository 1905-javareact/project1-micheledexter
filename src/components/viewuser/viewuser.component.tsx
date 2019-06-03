import React, { Component } from 'react';
import { apiClient } from '../../axios/user-api-client';
import { checkStatus } from '../../utilities/handle';
import './viewuser.component.css';

export class ViewUser extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {
        userId: -1,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: {
          roleId: -1,
          role: ''
        }
      }
    }
  }
  
  getUserInfo = async (id:number) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      checkStatus(response.status, this.props.history);
      this.setState({
        user: {...response.data}
      });
    } catch(e) {
      console.log(e);
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getUserInfo(id);
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <tr>
            <td>Username:</td>
            <td>{this.state.user.username}</td>
          </tr>
          <tr>
            <td>First Name:</td>
            <td>{this.state.user.firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{this.state.user.lastName}</td>
          </tr>
          <tr>
            <td>Email Address:</td>
            <td>{this.state.user.email}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{this.state.user.role.role}</td>
          </tr>
        </table>
      </div>
    )
  }
}