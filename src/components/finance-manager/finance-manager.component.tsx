import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import Users from '../users/users.component';

interface IFinanceManagerProps {
}


class FinanceManager extends Component<any, any> {

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="FinanceManager">
        <Users />
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