import React, { Component } from 'react';
import { apiClient } from '../../axios/user-api-client';
import { checkStatus, checkUserPermission } from '../../utilities/handle';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { History } from 'history';

interface IEditUserProps {
  history: History;
  match: {
    params: {
      id: number
    }
  };
  currentUser: User;
}

export class EditUser extends Component<IEditUserProps, any> {
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
          role: '',
          roleId: -1,
        },
      },
      change: false
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

  handleChangeForUsername = (event: any) => {
    this.setState({
      user: {
        ...this.state.user,
        username: event.target.value
      }
    });
  }

  handleChangeForPassword = (event: any) => {
    this.setState({
      user: {
        ...this.state.user,
        password: event.target.value
      }
    });
  }

  handleChangeForFirstname = (event: any) => {
    this.setState({
      user: {
        ...this.state.user,
        firstName: event.target.value
      }
    });
  }

  handleChangeForLastname = (event: any) => {
    this.setState({
      user: {
        ...this.state.user,
        lastName: event.target.value
      }
    });
  }

  handleChangeForEmail = (event: any) => {
    this.setState({
      user: {
        ...this.state.user,
        email: event.target.value
      }
    })
  }

  handleChangeForRole = (event:any) => {
    let id = -1;
    if (event.target.value === 'admin') {
      id = 1;
    } else if (event.target.value === 'finance-manager') {
      id = 2;
    } else {
      id = 3;
    }
    this.setState({
      user: {
        ...this.state.user,
        role: {
          role: event.target.value,
          roleId: id
        }
      }
    });
  }

  submitChange = (event: any) => {
    event.preventDefault();
    let su = this.state.user;
    let user: User = new User(su.userId, su.username, su.password, su.firstName, su.lastName, su.email, new Role(su.role.roleId, su.role.role));
    this.patchUser(user);
  }

  patchUser = async (user: User) => {
    await apiClient.patch('/users', user);
    this.setState({
      change: true
    });
  }

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, 'admin');
    const id = this.props.match.params.id;
    this.getUserInfo(id);
  }

  render() {
    return (
      <div className="EditUser">
        <form className="form" onSubmit={this.submitChange}>
          <label htmlFor="username">Username:&nbsp;</label>
          <input 
            name="username" 
            value={this.state.user.username} 
            onChange={this.handleChangeForUsername} 
            placeholder="Username"
            required
          /><br />
          <label htmlFor="password">Password:&nbsp;</label>
          <input 
            name="password" 
            value={this.state.user.password} 
            onChange={this.handleChangeForPassword}
            disabled
          /><br />
          <label htmlFor="firstName">First Name:&nbsp;</label>
          <input 
            name="firstName" 
            value={this.state.user.firstName} 
            onChange={this.handleChangeForFirstname} 
            placeholder="First Name"
            required
          /><br />
          <label htmlFor="lastName">Last Name:&nbsp;</label>
          <input 
            name="lastName" 
            value={this.state.user.lastName} 
            onChange={this.handleChangeForLastname} 
            placeholder="Last Name"
            required
          /><br />
          <label htmlFor="email">Email Address:&nbsp;</label>
          <input 
            name="email" 
            value={this.state.user.email} 
            onChange={this.handleChangeForEmail} 
            placeholder="Email Address"
            required
          /><br />
          <label htmlFor="role">Role:&nbsp;</label>
          <select name="role" onChange={this.handleChangeForRole}>
            <option value="admin" selected={this.state.user.role.role === 'admin'}>Admin</option>
            <option value="finance-manager" selected={this.state.user.role.role === 'finance-manager'}>Finance Manager</option>
            <option value="employee" selected={this.state.user.role.role === 'employee'}>Employee</option>
          </select><br />
          {this.state.change ? <p>Updated!</p>: ''}
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  };
};

export default connect(mapStateToProps)(EditUser);