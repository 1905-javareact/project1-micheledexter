import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { History } from 'history';

interface IViewReimbursementsProps {
  currentUser: User;
  history: History;
}

class ViewReimbursements extends Component<IViewReimbursementsProps, any> {
  render() {
    return (
      <div className="ViewReimbursements">
        Component
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewReimbursements);