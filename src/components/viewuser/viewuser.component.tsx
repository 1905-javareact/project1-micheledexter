import React, { Component } from 'react';
import { apiClient } from '../../axios/user-api-client';
import { checkStatus, checkUserPermission } from '../../utilities/handle';
import './viewuser.component.css';
import { History } from 'history';
import { User } from '../../models/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IViewUserProps {
  history: History;
  match: {
    params: {
      id: number;
    }
  }
  currentUser: User
}

export class ViewUser extends Component<IViewUserProps, any> {
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
    checkUserPermission(this.props.history, this.props.currentUser.role.role, 'finance-manager');
    const id = this.props.match.params.id;
    this.getUserInfo(id);
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <tbody>
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
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  }
}

export default connect(mapStateToProps)(ViewUser);