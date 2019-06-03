import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import Users from '../users/users.component';
import { History } from 'history';
import { checkUserPermission } from '../../utilities/handle';
import { User } from '../../models/user';

interface IFinanceManagerProps {
  currentUser: User;
  history: History;
}


class FinanceManager extends Component<IFinanceManagerProps, any> {

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['finance-manager', 'admin']);
  }

  render() {
    return (
      <div className="FinanceManager">
        <Users history={this.props.history} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FinanceManager);