import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { History } from 'history';
import { apiClient } from '../../axios/user-api-client';
import { FullReimbursement, Reimbursement, ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import { fullReimbursement } from '../../utilities/construct';
import ReimbursementCard from '../reimbursementcard/reimbursementcard.component';

interface IViewReimbursementsState {
  reimbursements: FullReimbursement[];
}

interface IViewReimbursementsProps {
  currentUser: User;
  history: History;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
}

class ViewReimbursements extends Component<IViewReimbursementsProps, IViewReimbursementsState> {
  constructor(props: IViewReimbursementsProps) {
    super(props);
    this.state = {
      reimbursements: []
    }
  }

  getReimbursementsByStatusId = (id: number) => {
    return this.getReimbursements(`/reimbursements/status/${id}`);
  }

  getReimbursementsByAuthorId = (id: number) => {
    return this.getReimbursements(`/reimbursements/author/userId/${id}`);
  }

  getReimbursements = async (endpoint: string) => {
    let response = await apiClient(endpoint);
    let rements: FullReimbursement[] = [];
    let raw: Reimbursement[] = response.data;
    for (let item of raw) {
      rements.push(fullReimbursement(item,this.props.statuses, this.props.types));
    }
    this.setState({
      reimbursements: rements
    });
  }

  componentDidMount() {
    this.getReimbursementsByStatusId(3);
  }

  render() {
    return (
      <div className="ViewReimbursements">
        {this.state.reimbursements.map((item) => <ReimbursementCard key={"reimbursement" + item.reimbursementId} reimbursement={item} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewReimbursements);