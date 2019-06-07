import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import { History } from 'history';

interface IUpdateReimbursementProps {
  currentUser: User;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
  history: History;
  match: {
    params: {
      id: number
    }
  };
}

class UpdateReimbursement extends Component<IUpdateReimbursementProps, any> {
  render() {
    return (
      <div className="UpdateReimbursement">
        Component
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types
  }
}

const mapDispatchToProps = {
  // imported dispatch props need to be mapped here
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReimbursement);