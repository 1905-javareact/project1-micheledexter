import React, { Component } from 'react';
import { apiClient } from '../../axios/user-api-client';
import { checkStatus, checkUserPermission } from '../../utilities/handle';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { History } from 'history';
import { fetchUsers } from '../../actions/user.actions';
import './edituser.component.css';

interface IEditUserProps {
  history: History;
  match: {
    params: {
      id: number
    }
  };
  currentUser: User;
  fetchUsers: () => void;
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
    this.props.fetchUsers();
  }

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin']);
    const id = this.props.match.params.id;
    this.getUserInfo(id);
  }

  render() {
    return (
      <div className="EditUser">
        <h1>Edit User</h1>
        <hr />
        <div className="container">
          <form className="form form-group" onSubmit={this.submitChange}>
            <div className="form-chunks">
              <div className="form-chunk">
                <label htmlFor="username">Username:&nbsp;</label>
                <input 
                  className="form-control"
                  name="username" 
                  value={this.state.user.username} 
                  onChange={this.handleChangeForUsername} 
                  placeholder="Username"
                  required
                /><br />
                <label htmlFor="password">Password:&nbsp;</label>
                <input 
                  className="form-control"
                  name="password" 
                  value={this.state.user.password} 
                  onChange={this.handleChangeForPassword}
                  disabled
                /><br />
              </div>
              <div className="form-chunk">
                <label htmlFor="firstName">First Name:&nbsp;</label>
                <input 
                  className="form-control"
                  name="firstName" 
                  value={this.state.user.firstName} 
                  onChange={this.handleChangeForFirstname} 
                  placeholder="First Name"
                  required
                /><br />
                <label htmlFor="lastName">Last Name:&nbsp;</label>
                <input 
                  className="form-control"
                  name="lastName" 
                  value={this.state.user.lastName} 
                  onChange={this.handleChangeForLastname} 
                  placeholder="Last Name"
                  required
                /><br />
              </div>
              <div className="form-chunk">
                <label htmlFor="email">Email Address:&nbsp;</label>
                <input 
                  className="form-control"
                  name="email" 
                  value={this.state.user.email} 
                  onChange={this.handleChangeForEmail} 
                  placeholder="Email Address"
                  required
                /><br />
                <label htmlFor="role">Role:&nbsp;</label>
                <select className="form-control" name="role" value={this.state.user.role.role} onChange={this.handleChangeForRole}>
                  <option value='admin'>Admin</option>
                  <option value='finance-manager'>Finance Manager</option>
                  <option value='employee'>Employee</option>
                </select><br />
              </div>
              {this.state.change ? <p>Updated!</p>: ''}
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  };
};

const mapDispatchToProps = {
  fetchUsers: fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);