import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import UsersAdmin from '../users/users-admin.component';
import { History } from 'history';
import { checkUserPermission } from '../../utilities/handle';

interface IAdminProps {
  currentUser: User;
  history: History
}

class Admin extends Component<IAdminProps, any> {

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin']);
  }

  render() {
    return (
      <div className="Admin">
        <UsersAdmin history={this.props.history} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);